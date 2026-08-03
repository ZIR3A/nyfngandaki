export const mockConstitutionData = {
  version: "2.1",
  effectiveDate: "2024-01-15",
  publishedDate: "2024-01-20",
  chapters: [
    {
      id: "chapter-1",
      number: 1,
      title: {
        en: "Preliminary",
        np: "प्रारम्भिक",
      },
      articles: [
        {
          id: "article-1",
          number: 1,
          title: {
            en: "Short Title and Commencement",
            np: "संक्षिप्त नाम र प्रारम्भ",
          },
          content: {
            en: "<p>This constitution may be called the <strong>National Youth Federation Nepal Constitution</strong>.</p><p>It shall come into force immediately upon approval by the general assembly.</p>",
            np: "<p>यस विधानको नाम <strong>राष्ट्रिय युवा संघ नेपाल विधान</strong> रहनेछ।</p><p>यो विधान महाधिवेशनबाट पारित भएपछि तुरुन्त लागू हुनेछ।</p>",
          },
        },
        {
          id: "article-2",
          number: 2,
          title: {
            en: "Definitions",
            np: "परिभाषा",
          },
          content: {
            en: "<p>Unless the subject or context otherwise requires, in this Constitution:</p><ul><li><strong>Organization</strong> means the National Youth Federation Nepal.</li><li><strong>Committee</strong> means any committee formed under this constitution.</li></ul>",
            np: "<p>विषय वा प्रसङ्गले अर्को अर्थ नलागेमा यस विधानमा:</p><ul><li><strong>संगठन</strong> भन्नाले राष्ट्रिय युवा संघ नेपाल सम्झनु पर्छ।</li><li><strong>समिति</strong> भन्नाले यस विधान अन्तर्गत गठन भएका समिति सम्झनु पर्छ।</li></ul>",
          },
        },
      ],
    },
    {
      id: "chapter-2",
      number: 2,
      title: {
        en: "Objectives",
        np: "उद्देश्य",
      },
      articles: [
        {
          id: "article-3",
          number: 3,
          title: {
            en: "Core Objectives",
            np: "मूल उद्देश्य",
          },
          content: {
            en: "<p>The main objectives of the organization are:</p><ol><li>To empower youth across the nation.</li><li>To promote national identity and integrity.</li></ol>",
            np: "<p>संगठनका मुख्य उद्देश्यहरू देहाय बमोजिम हुनेछन्:</p><ol><li>देशभरका युवाहरूलाई सशक्तिकरण गर्ने।</li><li>राष्ट्रिय पहिचान र अखण्डता प्रवर्द्धन गर्ने।</li></ol>",
          },
        },
      ],
    },
  ],
  documents: [
    {
      id: "doc-1",
      title: {
        en: "Full Constitution Document",
        np: "पूर्ण विधान दस्तावेज",
      },
      version: "2.1",
      category: "Constitution",
      format: "PDF",
      publishDate: "2024-01-20",
      size: "2.4 MB",
      language: "np",
    },
    {
      id: "doc-2",
      title: {
        en: "Directive for Provincial Committees",
        np: "प्रदेश कमिटीहरूका लागि निर्देशिका",
      },
      version: "1.0",
      category: "Directive",
      format: "DOCX",
      publishDate: "2023-11-10",
      size: "1.2 MB",
      language: "np",
    },
  ],
  versions: [
    {
      id: "v-2-1",
      version: "2.1",
      date: "2024-01-15",
      title: {
        en: "Third Amendment",
        np: "तेस्रो संशोधन",
      },
      description: {
        en: "Updated organizational structure and committee roles.",
        np: "सांगठनिक संरचना र कमिटीका भूमिकाहरू परिमार्जन।",
      },
      isCurrent: true,
    },
    {
      id: "v-2-0",
      version: "2.0",
      date: "2021-05-10",
      title: {
        en: "Second Amendment",
        np: "दोस्रो संशोधन",
      },
      description: {
        en: "Major overhaul for federal structure adaptation.",
        np: "संघीय संरचना अनुकूलका लागि मुख्य परिमार्जन।",
      },
      isCurrent: false,
    },
  ],
  amendments: [
    {
      id: "amend-1",
      title: {
        en: "Age Limit Revision",
        np: "उमेर हद परिमार्जन",
      },
      date: "2024-01-15",
      description: {
        en: "Revised the maximum age limit for general membership from 40 to 45.",
        np: "साधारण सदस्यताको अधिकतम उमेर हद ४० बाट ४५ कायम गरिएको।",
      },
      affectedChapters: [2],
    },
  ],
  resources: [
    {
      id: "res-1",
      title: {
        en: "Meeting Guidelines 2080",
        np: "बैठक सञ्चालन निर्देशिका २०८०",
      },
      category: "Guidelines",
      date: "2023-09-01",
    },
  ],
};
