export const websiteSelectors = {
  linkedin: {
    urlPattern: "linkedin.com/jobs",
    information: {
      position:
        "div.job-details-jobs-unified-top-card__job-title h1.t-24.t-bold.inline",
      company: ".job-details-jobs-unified-top-card__company-name",
      description: "#job-details > div",
    },
    jobContainer: "details-card-128b4cc8-9ceb-424f-b58b-6e8ba8dea3b5",
    targetDiv: "div.job-details-jobs-unified-top-card__top-buttons",
    buttonId: "linkedin-button",
    buttonClass:
      "social-share__dropdown-trigger artdeco-button artdeco-button--3 artdeco-button--tertiary artdeco-button--circle artdeco-button--muted artdeco-dropdown__trigger artdeco-dropdown__trigger--placement-bottom ember-view",
    buttonContainerClass:
      "artdeco-dropdown artdeco-dropdown--placement-bottom artdeco-dropdown--justification-right ember-view",
  },
  simplify: {
    urlPattern: "simplify.jobs/p/",
    information: {
      position: "h1.text-left.text-xl.font-bold.text-secondary-400",
      company: "p.text-left.text-lg.font-bold.text-secondary-400",
      description: "div.mt-4:nth-of-type(2)",
    },
    jobContainer: "div.flex.flex-col.gap-8.lg\\:flex-row",
    targetDiv: "div.mt-2.flex.justify-end.gap-x-4.text-sm.text-gray-500",
    buttonId: "simplify-button",
    buttonClass: "",
    buttonContainerClass: "",
  },
  indeed: {
    urlPattern: "indeed.com",
    information: {
      position: ".jobsearch-JobInfoHeader-title",
      company: ".jobsearch-InlineCompanyRating",
      description: ".jobsearch-JobMetadataHeader-item",
    },
    jobContainer: "details-card-128b4cc8-9ceb-424f-b58b-6e8ba8dea3b5",
    targetDiv: ".jobsearch-JobInfoHeader",
    buttonId: "indeed-button",
    buttonClass: "plus-button-indeed",
    buttonContainerClass: "plus-button-linkedin-container",
  },
};

export function getSelectors() {
  const currentURL = window.location.href;

  for (let site in websiteSelectors) {
    if (currentURL.includes(websiteSelectors[site].urlPattern)) {
      return websiteSelectors[site];
    }
  }
  return null;
}
