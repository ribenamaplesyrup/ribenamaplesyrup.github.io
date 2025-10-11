---
layout: project
title: "Geopolitical and Environmental Risk Monitor (GERM)"
description: "Uncovering emerging risks across the UK's 3M+ companies"
year: 2024
tags: [LLMs]
cover_image: '/images/projects/germ/warthog.jpg'
hero_image: '/images/projects/germ/warthog.jpg'
---
![Report](/images/projects/germ/screenshot.png){: .shadow}

The UK has 3 million+ active companies filing annual reports at Companies House. Distributed unevenly throughout these reports are interesting disclosures revealing some of the myriad ways in which geopolitics and climate are increasingly shaping the economy.

To explore this previously inaccessible region of reporting, I built a geopolitical and environment risk monitor (GERM) to ingest tens of thousands of documents daily and extract and classify these passages of text, cluster them by impact, and map them geospatially within a Streamlit application. 

This new capability allows me to detect nuanced signals that were previously lost in the noise. It has already surfaced surprising corporate cohorts, such as [firms reporting upside from war](https://adu.autonomy.work/posts/2025_02_20_crisis-and-commerce/){:target="_blank" rel="noopener noreferrer"} or those [disclosing specific types of criminal activity](https://adu.autonomy.work/posts/2025_02_11_exceptional-items/){:target="_blank" rel="noopener noreferrer"}, which would be nearly impossible to find with conventional search methods.

{% include figure.html src="/images/projects/germ/geopolitical-risks.png" caption='Risks from [ADF International](https://find-and-update.company-information.service.gov.uk/company/09923116/filing-history/MzQxNjQ5MDY4MmFkaXF6a2N4/document?format=xhtml&download=0){:target="_blank" rel="noopener noreferrer"}, [Grant & Bowman Limited](https://find-and-update.company-information.service.gov.uk/company/00918578/filing-history/MzQxNjEyMjkwNWFkaXF6a2N4/document?format=xhtml&download=0){:target="_blank" rel="noopener noreferrer"}, [Dukes Hotel Limited](https://find-and-update.company-information.service.gov.uk/company/01461396/filing-history/MzQxNjUwNzM4OGFkaXF6a2N4/document?format=xhtml&download=0){:target="_blank" rel="noopener noreferrer"}, [MacDougall Arts Limited](https://find-and-update.company-information.service.gov.uk/company/05175060/filing-history/MzQxNDY1ODY3NWFkaXF6a2N4/document?format=xhtml&download=0){:target="_blank" rel="noopener noreferrer"}, [Cardiff Rugby Limited](https://find-and-update.company-information.service.gov.uk/company/03199030/filing-history/MzQxNjQwMzg0N2FkaXF6a2N4/document?format=xhtml&download=0){:target="_blank" rel="noopener noreferrer"} & [Raims Limited](https://find-and-update.company-information.service.gov.uk/company/07247740/filing-history/MzQxMzQyMzUwNmFkaXF6a2N4/document?format=xhtml&download=0){:target="_blank" rel="noopener noreferrer"}' %}

{% include figure.html src="/images/projects/germ/environmental-risks.png" caption='Risks from [Traditional Norfolk Poultry Limited](https://find-and-update.company-information.service.gov.uk/company/04021155/filing-history/MzQxNTE5ODg0NWFkaXF6a2N4/document?format=xhtml&download=0){:target="_blank" rel="noopener noreferrer"}, [Kappersfoods (UK) Limited](https://find-and-update.company-information.service.gov.uk/company/07109396/filing-history/MzQxNTYxMjc5N2FkaXF6a2N4/document?format=xhtml&download=0){:target="_blank" rel="noopener noreferrer"}, [Hubbard’s Hills Trust](https://find-and-update.company-information.service.gov.uk/company/06758863/filing-history/MzQxNTYwMzg1MWFkaXF6a2N4/document?format=xhtml&download=0){:target="_blank" rel="noopener noreferrer"}, [Friends of Bude Sea Pool](https://find-and-update.company-information.service.gov.uk/company/07630060/filing-history/MzQxNjEwNTU5MGFkaXF6a2N4/document?format=xhtml&download=0){:target="_blank" rel="noopener noreferrer"}, [Open Cages Advocacy Ltd](https://find-and-update.company-information.service.gov.uk/company/12036812/filing-history/MzQxNjEzMzc4N2FkaXF6a2N4/document?format=xhtml&download=0){:target="_blank" rel="noopener noreferrer"} & [Ellis Brigham Mountain Sports Limited](https://find-and-update.company-information.service.gov.uk/company/06836989/filing-history/MzQxNTc2MjAzNGFkaXF6a2N4/document?format=xhtml&download=0){:target="_blank" rel="noopener noreferrer"}' %}

I’m currently using the tool to test several concepts: using embeddings to surface “islands of coalition” (firms facing similar risks across sectors/places), applying LLMs for advanced concept filtration (e.g., anti-fragility, adaptation, supply-chain diversification, business-model change), and testing interactive planning simulations that infer company-level risk profiles and generate scenario narratives, fusing filings with external signals and, where useful, feeding agent-based models.

**[Blog Post](https://adu.autonomy.work/posts/2024_03_23_GERM/){:target="_blank" rel="noopener noreferrer"}**
**[Demo](https://show.autonomy.work/GERM/){:target="_blank" rel="noopener noreferrer"}**

