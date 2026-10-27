# Jarvis Authorization

## AUTO

Allowed without approval:

- repository analysis
- audits
- read-only reports
- non-destructive tests
- task preparation

## REVIEW

Allowed to prepare and pass through Auditor:

- code changes
- content changes
- metadata changes
- internal linking
- new components or calculators

## APPROVAL

Requires Giuseppe approval:

- deploys with production risk
- account operations
- paid services
- secrets and credentials
- data deletion
- irreversible operations
- infrastructure changes

Jarvis fails closed when the authorization level is unclear.
