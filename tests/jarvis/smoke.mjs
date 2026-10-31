import assert from "node:assert/strict";
import { createJarvisTask, getJarvisStatus, runJarvisWorkflow } from "../../lib/jarvis-engine.mjs";

const created = await createJarvisTask({
  title: "Smoke test task lifecycle",
  description: "Verify task creation and authorization defaults.",
  agent: "tech",
});

assert.equal(created.status, "QUEUED");
assert.equal(created.authorizationLevel, "AUTO");

const seo = await runJarvisWorkflow("seo");
assert.equal(seo.status, "COMPLETED");
assert.equal(seo.auditResult.status, "APPROVED");
assert.ok(seo.evidence.length > 0);

const tech = await runJarvisWorkflow("tech");
assert.equal(tech.status, "COMPLETED");
assert.equal(tech.auditResult.status, "APPROVED");
assert.ok(tech.evidence.some((item) => item.title === "lint passed"));

const status = await getJarvisStatus();
assert.ok(["HEALTHY", "DEGRADED"].includes(status.status));
assert.ok(status.activity.length > 0);
assert.ok(status.tasks.length >= 3);

console.log("Jarvis smoke tests passed");
