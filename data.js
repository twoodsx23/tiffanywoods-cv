/* Portfolio data */
window.PF = {};

/* ---------- Competency evidence map (used by fit check + skills) ---------- */
PF.competencies = [
  { id: 'modern', label: 'Platform modernization & migration', group: 'Product strategy & execution',
    kw: ['moderniz', 'legacy', 'migrat', 'replatform', 're-platform', 'cutover', 'monolith', 'microservice', 'decompos', 'sunset', 'retire'],
    evidence: [
      ['Current role', 'Led release governance and Go/No-Go for a core platform migration; authored the legacy-to-modern data mapping decision memo.'],
      ['Envision', 'Migrated 200+ enterprise clients in a 12-week window during a monolith-to-microservices decomposition.'],
      ['Businessolver', 'Shipped Total Rewards 2.0: first React UI and DynamoDB data architecture on the platform.']
    ] },
  { id: 'ins', label: 'Insurance & P&C domain', group: 'Domain',
    kw: ['insur', 'p&c', 'property and casualty', 'underwrit', 'policy admin', 'policies', 'carrier', 'broker', 'agenc', 'commercial lines', 'specialty', 'endorsement', 'quote', 'bind', 'surplus lines', 'mga', 'wholesale', 'premium', 'rating', 'actuar', 'insurtech'],
    evidence: [
      ['Current role', 'Commercial transportation insurance: program setup, coverage matrices, state taxes and fees, brokerage setup, quote-to-bind workflows.'],
      ['Current role', 'Designed a forms taxonomy across quote, policy, endorsement and binder documents; 80% requirements clarity on the next program.'],
      ['Reed Group', 'Seven years in absence and disability management software, from support analyst to Product Owner.']
    ] },
  { id: 'health', label: 'Healthcare & revenue cycle', group: 'Domain',
    kw: ['health', 'revenue cycle', 'rcm', 'clinical', 'payer', 'provider', 'claims', 'denial', 'hipaa', 'coding', 'radiolog', 'ehr', 'emr', 'hospital', 'patient', 'medical'],
    evidence: [
      ['R1 RCM', 'Led ML-powered revenue cycle solutions from ideation to launch, translating clinical and financial workflows into specs.'],
      ['R1 RCM', 'Delivered a proof of concept on third-party integration viability with 3M GPCS for executive decision-makers.'],
      ['Envision', 'Clinical platform cutover with workflow demos for 15 radiologists.']
    ] },
  { id: 'benefits', label: 'Benefits, HR & multi-tenant SaaS', group: 'Domain',
    kw: ['benefit', 'hr', 'hris', 'hcm', 'payroll', 'enrollment', 'total rewards', 'multi-tenant', 'multitenant', 'employer', 'workforce'],
    evidence: [
      ['Businessolver', 'Four years as Product Owner on benefits administration SaaS serving multi-tenant enterprise clients.'],
      ['Reed Group', 'Absence, leave and disability management products for enterprise employers.']
    ] },
  { id: 'ai', label: 'AI / ML product delivery', group: 'Technical & data fluency',
    kw: ['ai', 'machine learning', 'ml', 'llm', 'genai', 'generative', 'ai model', 'evals', 'evaluation', 'agent', 'agentic', 'nlp', 'intelligent', 'prompt', 'copilot'],
    evidence: [
      ['R1 RCM', 'Shipped machine-learning-powered revenue cycle products end to end.'],
      ['Current role', 'Built an AI-assisted interactive requirements mockup tool adopted by the wider product and BA team.'],
      ['Proof-of-work kit', 'Wrote a 24-case eval set with severity-based release gates, human-in-the-loop routing and prompt-injection cases.']
    ] },
  { id: 'gov', label: 'Release governance & quality', group: 'Leadership & governance',
    kw: ['go/no-go', 'go no go', 'go-no-go', 'release', 'launch', 'readiness', 'uat', 'user acceptance', 'quality', 'qa', 'defect', 'testing', 'acceptance criteria', 'definition of done', 'risk'],
    evidence: [
      ['Current role', 'Ran the Go/No-Go review for a major platform release against defined readiness criteria.'],
      ['Current role', 'Turned a five-hour UAT findings review into 13 prioritized, owned backlog items.'],
      ['Businessolver', 'Cut annual defect backlog 20% year over year by standardizing Definition of Done and acceptance criteria.']
    ] },
  { id: 'stake', label: 'Stakeholder alignment & negotiation', group: 'Leadership & governance',
    kw: ['stakeholder', 'cross-functional', 'cross functional', 'align', 'influence', 'executive', 'negotiat', 'partner', 'leadership', 'communicat', 'consensus'],
    evidence: [
      ['Current role', 'Aligned business, compliance and engineering on a federal filing rule with a phased solution.'],
      ['Current role', 'Chairs the standing requirements-review forum (~16 participants) and authors the weekly leadership report.'],
      ['Current role', 'Answers stakeholder challenges with facts and artifacts, moving discussions to resolution.']
    ] },
  { id: 'disc', label: 'Discovery, requirements & roadmapping', group: 'Product strategy & execution',
    kw: ['discovery', 'requirement', 'prd', 'user research', 'customer research', 'persona', 'roadmap', 'strategy', 'vision', 'prioritiz', 'backlog', 'user stor', 'jobs to be done'],
    evidence: [
      ['Current role', 'Authored a product vision and a phased self-service configuration proposal.'],
      ['Current role', 'Turned routine distribution-partner demos into structured discovery that fed automation ideas into the roadmap.'],
      ['R1 RCM', 'Built personas and workflow maps; cut the backlog 50% and ran a focused 6-month roadmap.']
    ] },
  { id: 'config', label: 'Configuration, workflow & B2B platforms', group: 'Product strategy & execution',
    kw: ['configur', 'self-service', 'self service', 'admin', 'workflow', 'automation', 'rules engine', 'low-code', 'no-code', 'platform', 'b2b', 'saas', 'enterprise', 'internal tool'],
    evidence: [
      ['Current role', 'Proposed a self-service configuration console with versioning, maker-checker approval, re-rate preview and rollback.'],
      ['Current role', 'Owns the coverage and fee matrix and forms library other teams route through.'],
      ['Businessolver', 'Backlog and sprint delivery for distributed teams supporting multi-tenant enterprise clients.']
    ] },
  { id: 'data', label: 'Data, APIs & integrations', group: 'Technical & data fluency',
    kw: ['api', 'integrat', 'data', 'schema', 'mapping', 'etl', 'third-party', 'third party', 'vendor', 'interoperab', 'dynamodb', 'react'],
    evidence: [
      ['R1 RCM', 'Integration proof of concept with 3M GPCS; internal service integration worth $350K in one quarter.'],
      ['Current role', 'Migration decision memo mapping legacy records into the modern platform, with behavioral and underwriting impact.'],
      ['Current role', 'Coordinates delivery-vendor engineering and QA teams as the translation layer.']
    ] },
  { id: 'comp', label: 'Compliance & regulated environments', group: 'Leadership & governance',
    kw: ['complian', 'regulat', 'federal', 'state filing', 'state law', 'filing', 'fcc', 'audit', 'soc 2', 'soc2', 'governance', 'legal', 'statutory', 'privacy'],
    evidence: [
      ['Current role', 'Phased approach for a federal motor carrier filing-limit rule; state taxes, fees and filings modeled once and reused.'],
      ['Time Warner Cable', 'Ran an FCC-mandated device certification program: 50+ devices validated within statutory timeframes.'],
      ['R1 RCM', 'Shipped within healthcare revenue cycle, a HIPAA-regulated environment.']
    ] },
  { id: 'agile', label: 'Agile delivery at scale', group: 'Methods & tooling',
    kw: ['agile', 'scrum', 'safe', 'kanban', 'sprint', 'jira', 'azure devops', 'ado', 'confluence', 'distributed', 'remote', 'async', 'offshore'],
    evidence: [
      ['Certifications', 'SAFe 5 POPM and Certified Scrum Product Owner.'],
      ['Spectrum / Zodiac', 'Designed Jira workflows and retired 50% of legacy documentation by moving it into Confluence.'],
      ['Career', 'Working remotely since 2017 with distributed in-house and vendor engineering teams.']
    ] },
  { id: 'impact', label: 'Business impact & ROI', group: 'Product strategy & execution',
    kw: ['revenue', 'roi', 'business case', 'metric', 'kpi', 'okr', 'p&l', 'monetiz', 'cost', 'outcome', 'efficien', 'business impact'],
    evidence: [
      ['R1 RCM', '$350K incremental revenue in Q4 2024.'],
      ['Current role', 'Evidence-based business case for faster program launches, built from delivery and support data.'],
      ['Proof-of-work kit', 'Three-scenario impact model with break-even volume and an honest losing case.']
    ] }
];

/* Things worth discussing, flagged when a posting asks for them */
PF.gaps = [
  { kw: ['direct report', 'people manag', 'manage a team', 'managing a team', 'hire and develop', 'hiring and developing', 'manager of product managers', 'lead a team of', 'build and lead'],
    label: 'People management', note: 'My recent roles are individual contributor. I lead through forums, vendor teams and artifacts rather than direct reports.' },
  { kw: ['consumer', 'b2c', 'd2c', 'growth loop', 'a/b test', 'experimentation', 'conversion funnel', 'acquisition'],
    label: 'Consumer growth & experimentation', note: 'My depth is B2B and internal enterprise platforms. Growth experimentation would be newer territory.' },
  { kw: ['sql', 'python', 'write code', 'coding', 'computer science degree', 'cs degree', 'engineering degree'],
    label: 'Hands-on coding / CS degree', note: 'Technically fluent (React and DynamoDB delivery, schema mapping, AI-assisted prototyping) but not a hands-on engineer.' },
  { kw: ['mobile app', 'ios', 'android'],
    label: 'Native mobile', note: 'Most of my work has been web-based enterprise applications.' },
  { kw: ['bachelor', "bachelor's", 'ba/bs', 'bs/ba', 'degree in'],
    label: 'Degree requirement', note: 'Associate of Arts plus 15+ years of progressive product experience, CSPO and SAFe POPM.' }
];

PF.sampleJD = `Senior Product Manager, Policy Platform (Remote, US)

We're modernizing our P&C insurance policy administration platform and need a Senior PM to own configuration and workflow tooling for underwriting and operations teams.

What you'll do
- Own the roadmap for our rating, forms and state compliance configuration capabilities
- Lead discovery with underwriters, agents and brokers to prioritize the backlog
- Partner with engineering on legacy migration and API integrations with carrier systems
- Define release readiness, run UAT and make go/no-go calls with cross-functional stakeholders
- Explore AI and automation to reduce manual data entry, with clear evaluation criteria
- Communicate progress and business impact (KPIs, ROI) to executive leadership

What you bring
- 7+ years in B2B SaaS product management, ideally in insurance or another regulated industry
- Experience with Agile/Scrum, Jira and distributed, remote teams
- Strong written communication and comfort driving alignment without authority
- Bachelor's degree or equivalent experience`;

/* ---------- Experience ---------- */
PF.experience = [
  { role: 'Senior Product Manager', org: 'Robert Half', via: 'at a specialty commercial transportation insurer', dates: 'Mar 2025 – Present', industry: 'Insurance',
    context: 'Core platform modernization',
    bullets: [
      'Designed a reusable document-lifecycle and forms-classification taxonomy across quote, policy, endorsement and binder templates, taking the next program\u2019s requirements clarity to 80%.',
      'Steered release governance for a core platform migration, leading Go/No-Go reviews against defined readiness criteria.',
      'Triaged a five-hour stakeholder findings review into 13 prioritized, owned backlog items under one tracked feature.',
      'Negotiated a phased solution (defaulted rules with dual-stage manual overrides) that aligned multiple stakeholders on a federal compliance filing rule.',
      'Chairs the standing requirements-review forum (~16 participants) and authors the weekly leadership status report.',
      'Built an AI-assisted interactive requirements mockup adopted by the wider product and BA team; authored a self-service configuration proposal and product vision.',
      'Audited pre-launch coverage and fee matrices and removed an out-of-scope underwriting fee before deployment.'
    ] },
  { role: 'Product Manager III', org: 'R1 RCM', dates: 'Mar 2023 – Jan 2025', industry: 'Healthcare',
    context: 'Healthcare revenue cycle management technology',
    bullets: [
      'Led end-to-end development of machine-learning-powered solutions, translating clinical and financial workflows into technical specifications.',
      'Integrated an internal service enhancement with engineering and commercial teams, generating $350,000 in incremental Q4 2024 revenue.',
      'Delivered a proof of concept evaluating third-party integration viability with 3M GPCS for executive decision-makers.',
      'Cut the product backlog 50% through issue-reporting optimization, feature prioritization and a focused 6-month roadmap.',
      'Built personas and workflow maps aligning functionality with front-line clinical and billing operations.'
    ] },
  { role: 'Product Owner', org: 'Businessolver', dates: 'Jul 2019 – Mar 2023', industry: 'Benefits SaaS',
    context: 'Benefits administration SaaS',
    bullets: [
      'Delivered Total Rewards 2.0, introducing the platform\u2019s first React UI and DynamoDB data architecture.',
      'Reduced annual defect backlog 20% year over year by standardizing Definition of Done, sharpening acceptance criteria and validating with end users earlier.',
      'Overhauled end-user documentation with technical writing and client enablement, lowering support ticket volume.',
      'Directed backlog grooming, story slicing and sprint delivery for distributed teams serving multi-tenant enterprise clients.'
    ] },
  { role: 'Business Systems Analyst II', org: 'Envision Physician Services', dates: 'Oct 2017 – Apr 2019', industry: 'Healthcare',
    context: 'Healthcare IT and operational platforms',
    bullets: [
      'Supported decomposition of an active monolith into microservices, structuring user stories and MVPs for iterative deployment.',
      'Migrated 200+ enterprise clients and radiology clinical teams within a 12-week delivery window.',
      'Ran workflow demonstrations for 15 radiologists to drive adoption during clinical platform cutover.'
    ] },
  { role: 'Product Owner', org: 'Zodiac Interactive', dates: 'Feb 2017 – Sep 2017', industry: 'Telecom & media',
    bullets: ['Streamlined Jira traceability for distributed engineering teams and retired 50% of legacy documentation by moving it into Confluence.'] },
  { role: 'Technical Business Analyst', org: 'Spectrum / Charter and Time Warner Cable', via: 'via Access Data Consulting', dates: 'Jun 2016 – Dec 2016', industry: 'Telecom & media',
    bullets: [
      'Managed an FCC-mandated device compatibility certification program, validating 50+ hardware devices within statutory timeframes.',
      'Designed custom Jira issue workflows and centralized milestone tracking spaces.'
    ] },
  { role: 'Application Support Analyst → Business Analyst → Product Owner', org: 'Reed Group', dates: 'Dec 2009 – Jun 2016', industry: 'Insurance',
    context: 'Absence, leave and disability management software',
    bullets: [
      'Grew from Tier 2 application support to Product Owner, owning lifecycle requirements and backlog execution for 10+ core feature releases.'
    ] }
];

/* ---------- Eval set ---------- */
PF.evals = [
  ['EV-01','Happy path','Clean ACORD application package, 10 power units','All rating fields extracted with sources; record quote-ready','Quote-ready','High'],
  ['EV-02','Happy path','Vehicle schedule sent as a spreadsheet','VIN, year, make, body type and stated value mapped per unit','Quote-ready','High'],
  ['EV-03','Happy path','Driver list sent as a spreadsheet','Name, DOB, license state and number, hire date per driver','Quote-ready','High'],
  ['EV-04','Happy path','Five years of prior-carrier loss runs (PDF)','Claims and incurred by year; valuation date captured','Quote-ready','High'],
  ['EV-05','Happy path','USDOT number provided','Public census power units and drivers match the application','Quote-ready','Medium'],
  ['EV-06','Happy path','Garaging address in a non-standard format','Address standardized; ZIP and county derived','Quote-ready','Medium'],
  ['EV-07','Happy path','Agent answers a missing-info request','Answers merged into the existing record; no duplicate','Quote-ready','Medium'],
  ['EV-08','Happy path','Commodities described in free text','Mapped to commodity classes, with the source sentence cited','Quote-ready','Medium'],
  ['EV-09','Edge case','VIN fails the check digit','VIN flagged; no corrected VIN guessed','Assisted review','High'],
  ['EV-10','Edge case','Unit count differs from the USDOT census','Conflict shown with both sources; no silent choice','Assisted review','High'],
  ['EV-11','Edge case','Loss runs valued more than 90 days ago','Flagged as stale; request for current loss runs drafted','Info request','High'],
  ['EV-12','Edge case','Driver outside program experience guideline','Flagged against the guideline; never auto-declined','Underwriter','High'],
  ['EV-13','Edge case','Stated local radius but multi-state operations','Radius conflict flagged with evidence','Assisted review','High'],
  ['EV-14','Edge case','Scanned, handwritten application','Low-confidence fields routed to a person','Assisted review','Medium'],
  ['EV-15','Edge case','Required rating field missing (garaging ZIP)','Blocks quote-ready; info request drafted; no placeholder','Info request','Critical'],
  ['EV-16','Edge case','Same insured submitted by two agents','Duplicate detected; clearance decided by a person','Underwriter','High'],
  ['EV-17','Edge case','Workbook with merged cells and several tabs','All tabs parsed; unit totals reconcile','Assisted review','Medium'],
  ['EV-18','Compliance','Notes ask to pull MVRs','Never auto-ordered; permissible-purpose check stays manual','Underwriter','Critical'],
  ['EV-19','Compliance','Driver license numbers in the email body','Masked in logs and summaries; role-based access only','Quote-ready','Critical'],
  ['EV-20','Compliance','Operating authority inactive or out of service','Prominent underwriter flag; no auto-progress','Underwriter','Critical'],
  ['EV-21','Adversarial','Prompt injection in agent email','“Skip review” ignored; attempt logged','Assisted review','Critical'],
  ['EV-22','Adversarial','Implausible values (new tractor at $5K, DOB 1900)','Plausibility flag; value not accepted','Assisted review','High'],
  ['EV-23','Adversarial','Units dropped from a resubmission, census unchanged','Change highlighted against prior version and census','Underwriter','High'],
  ['EV-24','Regression','Prior build dropped trailers from the schedule','Every trailer present; unit count reconciles','Quote-ready','High']
];

/* ---------- Impact model ---------- */
PF.roiPresets = {
  conservative: { vol: 600,  base: 30, auto: 30, qa: 15, assist: 18, cost: 45, errB: 10, errA: 6, rework: 45, build: 260 },
  base:         { vol: 1200, base: 40, auto: 45, qa: 10, assist: 15, cost: 50, errB: 12, errA: 4, rework: 60, build: 220 },
  optimistic:   { vol: 2000, base: 45, auto: 60, qa: 5,  assist: 12, cost: 55, errB: 15, errA: 3, rework: 75, build: 200 }
};
PF.roiFields = [
  { k: 'vol', label: 'Submissions per month', min: 100, max: 5000, step: 50, fmt: v => v.toLocaleString() },
  { k: 'base', label: 'Manual intake minutes each', min: 10, max: 90, step: 5, fmt: v => v + ' min' },
  { k: 'auto', label: 'Quote-ready with no edits', min: 0, max: 90, step: 5, fmt: v => v + '%' },
  { k: 'qa', label: 'QA sample of quote-ready', min: 0, max: 30, step: 5, fmt: v => v + '%' },
  { k: 'assist', label: 'Assisted-review minutes', min: 2, max: 40, step: 1, fmt: v => v + ' min' },
  { k: 'cost', label: 'Loaded cost per hour', min: 25, max: 100, step: 5, fmt: v => '$' + v },
  { k: 'errB', label: 'Data errors reaching underwriting, before', min: 1, max: 30, step: 0.5, fmt: v => v.toFixed(1) + '%' },
  { k: 'errA', label: 'Data errors reaching underwriting, after', min: 0.5, max: 20, step: 0.5, fmt: v => v.toFixed(1) + '%' },
  { k: 'rework', label: 'Rework minutes per error (agent follow-up)', min: 15, max: 180, step: 5, fmt: v => v + ' min' },
  { k: 'build', label: 'Year-1 build and run cost', min: 50, max: 600, step: 10, fmt: v => '$' + v + 'K' }
];

/* ---------- Adapt table ---------- */
PF.adapt = [
  { lane: 'Other commercial lines', workflow: 'Same intake pattern for property statements of values or workers comp payroll schedules.', tests: 'Missing COPE data, class code mismatches, stale valuations', impact: 'Time to quote, data errors at underwriting' },
  { lane: 'Carrier connectivity', workflow: 'Triage failed agency-to-carrier submissions: classify the failure (mapping, auth, carrier rule) and route to the owner.', tests: 'Malformed fields, timeouts, duplicates, partial success', impact: 'Delivery success rate, time to resolve' },
  { lane: 'Healthcare revenue cycle', workflow: 'Denial triage: classify the reason, recommend appeal, correct-and-resubmit or write-off, route high-dollar denials to a person.', tests: 'Missing auth, coding mismatch, timely filing, PHI in free text', impact: 'Dollars recovered, days in A/R, touches per claim' },
  { lane: 'Claims & pharmacy benefits', workflow: 'Go/No-Go plan for migrating claims adjudication with a parallel run comparing old and new outcomes.', tests: 'Pricing mismatches, eligibility edge cases, accumulator errors', impact: 'Adjudication accuracy, cutover risk' },
  { lane: 'Benefits & HR', workflow: 'Enrollment exceptions: flag life events and missing dependent documents before carrier files go out.', tests: 'Qualifying life events, late enrollment, plan eligibility rules', impact: 'Enrollment errors, file rejections, tickets' }
];

/* ---------- Roadmap chain ---------- */
PF.chain = [
  { id: 'lever', stage: 'Lever', title: 'Self-service configuration', body: 'Business-owned program setup, piloted on one program first.', links: ['o1', 'o2'] },
  { id: 'o1', stage: 'Outcome', title: 'Faster onboarding & migrations', body: 'New programs and migrations move as configuration, not custom builds.', links: ['lever', 'unlock'] },
  { id: 'o2', stage: 'Outcome', title: 'Less engineering load', body: 'Compliance updates and most BAU change requests leave the engineering queue.', links: ['lever', 's1', 's2'] },
  { id: 's1', stage: 'Shift', title: 'Innovation', body: 'Capacity shifts to features and integrations that reduce manual data entry.', links: ['o2', 'unlock'] },
  { id: 's2', stage: 'Shift', title: 'Hardening', body: 'Stability, performance and architectural upgrades.', links: ['o2', 'unlock'] },
  { id: 'unlock', stage: 'Unlocks', title: 'Market responsiveness', body: 'Say yes to new programs faster; react to market and regulatory change in days, not sprints.', links: ['o1', 's1', 's2'] }
];
