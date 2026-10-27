declare module "@/lib/jarvis-engine.mjs" {
  export const AGENTS: Array<{ id: string; label: string; status: string }>;
  export function getJarvisStatus(): Promise<Record<string, unknown>>;
  export function getJarvisState(): Promise<Record<string, unknown>>;
  export function createJarvisTask(input: Record<string, unknown>): Promise<Record<string, unknown>>;
  export function runJarvisWorkflow(kind?: string): Promise<Record<string, unknown>>;
  export function runTask(taskId: string): Promise<Record<string, unknown>>;
  export function updateApproval(id: string, status: string): Promise<Record<string, unknown>>;
  export function seedApprovalRequest(): Promise<void>;
  export function getIntegrationStatus(): Promise<Array<Record<string, unknown>>>;
  export function notifyJarvis(type: string, payload?: Record<string, unknown>): Promise<Record<string, unknown>>;
  export function chatWithJarvis(message: string): Promise<Record<string, unknown>>;
}
