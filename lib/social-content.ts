import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type SocialChannelName = "facebook" | "linkedin" | "instagram" | "tiktok" | "youtube";

export type SocialCampaignSummary = {
  id: string;
  locale: string;
  pageHref: string;
  title: string;
  guideHref: string | null;
  guideTitle: string | null;
  keyword: string;
  status: string;
  priority: string;
  channels: {
    name: SocialChannelName;
    items: number;
  }[];
};

export type SocialCalendarEntry = {
  date: string;
  campaignId: string;
  locale: string;
  pageHref: string;
  pageTitle: string;
  guideHref: string | null;
  guideTitle: string | null;
  channel: SocialChannelName;
  channelLabel: string;
  status: string;
  utmUrl: string;
  contentTitle: string;
  campaign: string;
  audience: string;
};

type SocialCampaignIndex = {
  generatedAt: string;
  campaigns: SocialCampaignSummary[];
};

type SocialCalendar = {
  generatedAt: string;
  days: SocialCalendarEntry[];
};

export type SocialChannelStatus = {
  name: SocialChannelName;
  label: string;
  plannedItems: number;
  scheduledItems: number;
  nextEntry: SocialCalendarEntry | null;
};

export type SocialContentStatus = {
  generatedAt: string;
  campaigns: SocialCampaignSummary[];
  calendar: SocialCalendarEntry[];
  channels: SocialChannelStatus[];
  totals: {
    campaigns: number;
    plannedItems: number;
    scheduledItems: number;
  };
};

const channelLabels = {
  facebook: "Facebook",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube Shorts",
} satisfies Record<SocialChannelName, string>;

const orderedChannels = Object.keys(channelLabels) as SocialChannelName[];

export async function getSocialContentStatus(): Promise<SocialContentStatus> {
  const [campaignIndex, calendar] = await Promise.all([
    readJson<SocialCampaignIndex>("social-content/campaigns/index.json"),
    readJson<SocialCalendar>("social-content/calendar/2026-08.json"),
  ]);

  const channels = orderedChannels.map((name) => {
    const plannedItems = campaignIndex.campaigns.reduce((total, campaign) => {
      return total + (campaign.channels.find((channel) => channel.name === name)?.items ?? 0);
    }, 0);
    const scheduledEntries = calendar.days.filter((entry) => entry.channel === name);

    return {
      name,
      label: channelLabels[name],
      plannedItems,
      scheduledItems: scheduledEntries.length,
      nextEntry: scheduledEntries[0] ?? null,
    };
  });

  return {
    generatedAt: campaignIndex.generatedAt,
    campaigns: campaignIndex.campaigns,
    calendar: calendar.days,
    channels,
    totals: {
      campaigns: campaignIndex.campaigns.length,
      plannedItems: channels.reduce((total, channel) => total + channel.plannedItems, 0),
      scheduledItems: calendar.days.length,
    },
  };
}

async function readJson<T>(path: string): Promise<T> {
  const content = await readFile(join(process.cwd(), path), "utf8");
  return JSON.parse(content) as T;
}
