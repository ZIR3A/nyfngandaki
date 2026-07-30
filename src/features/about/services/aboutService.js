import AboutPage from '@/models/AboutPage';
import AboutCoreValue from '@/models/AboutCoreValue';
import AboutObjective from '@/models/AboutObjective';
import AboutTimeline from '@/models/AboutTimeline';
import AboutStatistic from '@/models/AboutStatistic';
import AboutDocument from '@/models/AboutDocument';
import AboutPartner from '@/models/AboutPartner';
import AboutFAQ from '@/models/AboutFAQ';
import Storage from '@/modules/storage/models/storage.model';
import { ActivityService } from '@/services/ActivityService';
import { MemberService } from '@/services/MemberService';

export const aboutService = {
  // PUBLIC AGGREGATION
  async getPublicAboutPage(provinceId) {
    const aboutPage = await AboutPage.findOne({ provinceId, deletedAt: null })
      .populate('hero.imageId')
      .populate({ path: 'organization.imageId', strictPopulate: false })
      .populate('seo.ogImageId')
      .lean();

    // Manual resolution: if organization.imageId was not populated (raw ObjectId due to
    // Mongoose model cache mismatch), fetch the Storage doc explicitly.
    let organization = aboutPage?.organization || {};
    if (organization.imageId && typeof organization.imageId !== 'object') {
      const storageDoc = await Storage.findById(organization.imageId).lean();
      organization = { ...organization, imageId: storageDoc || null };
    } else if (organization.imageId && !organization.imageId.publicUrl) {
      // Populated but missing publicUrl — refetch to be safe
      const storageDoc = await Storage.findById(organization.imageId._id).lean();
      organization = { ...organization, imageId: storageDoc || null };
    }

    const coreValues = await AboutCoreValue.find({ provinceId, deletedAt: null, status: 'ACTIVE' })
      .sort({ displayOrder: 1 })
      .populate('iconId')
      .lean();

    const documents = await AboutDocument.find({ provinceId, deletedAt: null, status: 'ACTIVE' })
      .sort({ displayOrder: 1 })
      .populate('documentId')
      .lean();

    // Build leadership object from chairperson member
    const chairperson = await MemberService.getChairperson();
    const leadership = chairperson
      ? {
          name: chairperson.name?.en || '',
          designation: chairperson.position,          // { en, np }
          photo: chairperson.photo ? { url: chairperson.photo, alt: chairperson.name?.en || 'Leader' } : null,
          message: chairperson.biography,             // { en, np }
          label: { en: 'Provincial Leadership', np: 'प्रदेश नेतृत्व' },
          heading: { en: 'Message from the President', np: 'अध्यक्षको सन्देश' },
        }
      : null;

    return {
      hero: aboutPage?.hero || {},
      organization,
      // Leadership built from top featured member — same API source as homepage
      leadership,
      cta: aboutPage?.cta || {},
      seo: aboutPage?.seo || {},
      documentsConfig: aboutPage?.documentsConfig || {},
      coreValues,
      documents
    };
  },

  // ABOUT PAGE (GENERAL)
  async updateAboutPage(provinceId, data, userId) {
    return AboutPage.findOneAndUpdate(
      { provinceId, deletedAt: null },
      { ...data, updatedBy: userId },
      { new: true, upsert: true }
    );
  },

  // CORE VALUES
  async getCoreValues(provinceId) {
    return AboutCoreValue.find({ provinceId, deletedAt: null }).sort({ displayOrder: 1 });
  },
  async createCoreValue(provinceId, data, userId) {
    return AboutCoreValue.create({ ...data, provinceId, createdBy: userId, updatedBy: userId });
  },
  async updateCoreValue(id, data, userId) {
    return AboutCoreValue.findByIdAndUpdate(id, { ...data, updatedBy: userId }, { new: true });
  },
  async deleteCoreValue(id, userId) {
    return AboutCoreValue.findByIdAndUpdate(id, { deletedAt: new Date(), updatedBy: userId }, { new: true });
  },

  // OBJECTIVES
  async getObjectives(provinceId) {
    return AboutObjective.find({ provinceId, deletedAt: null }).sort({ displayOrder: 1 });
  },
  async createObjective(provinceId, data, userId) {
    return AboutObjective.create({ ...data, provinceId, createdBy: userId, updatedBy: userId });
  },
  async updateObjective(id, data, userId) {
    return AboutObjective.findByIdAndUpdate(id, { ...data, updatedBy: userId }, { new: true });
  },
  async deleteObjective(id, userId) {
    return AboutObjective.findByIdAndUpdate(id, { deletedAt: new Date(), updatedBy: userId }, { new: true });
  },

  // TIMELINE
  async getTimeline(provinceId) {
    return AboutTimeline.find({ provinceId, deletedAt: null }).sort({ year: -1, displayOrder: 1 });
  },
  async createTimeline(provinceId, data, userId) {
    return AboutTimeline.create({ ...data, provinceId, createdBy: userId, updatedBy: userId });
  },
  async updateTimeline(id, data, userId) {
    return AboutTimeline.findByIdAndUpdate(id, { ...data, updatedBy: userId }, { new: true });
  },
  async deleteTimeline(id, userId) {
    return AboutTimeline.findByIdAndUpdate(id, { deletedAt: new Date(), updatedBy: userId }, { new: true });
  },

  // ACTIVITIES
  async getActivities(provinceId) {
    return AboutActivity.find({ provinceId, deletedAt: null }).sort({ displayOrder: 1 });
  },
  async createActivity(provinceId, data, userId) {
    return AboutActivity.create({ ...data, provinceId, createdBy: userId, updatedBy: userId });
  },
  async updateActivity(id, data, userId) {
    return AboutActivity.findByIdAndUpdate(id, { ...data, updatedBy: userId }, { new: true });
  },
  async deleteActivity(id, userId) {
    return AboutActivity.findByIdAndUpdate(id, { deletedAt: new Date(), updatedBy: userId }, { new: true });
  },

  // STATISTICS
  async getStatistics(provinceId) {
    return AboutStatistic.find({ provinceId, deletedAt: null }).sort({ displayOrder: 1 });
  },
  async createStatistic(provinceId, data, userId) {
    return AboutStatistic.create({ ...data, provinceId, createdBy: userId, updatedBy: userId });
  },
  async updateStatistic(id, data, userId) {
    return AboutStatistic.findByIdAndUpdate(id, { ...data, updatedBy: userId }, { new: true });
  },
  async deleteStatistic(id, userId) {
    return AboutStatistic.findByIdAndUpdate(id, { deletedAt: new Date(), updatedBy: userId }, { new: true });
  },

  // DOCUMENTS
  async getDocuments(provinceId) {
    return AboutDocument.find({ provinceId, deletedAt: null }).sort({ displayOrder: 1 });
  },
  async createDocument(provinceId, data, userId) {
    return AboutDocument.create({ ...data, provinceId, createdBy: userId, updatedBy: userId });
  },
  async updateDocument(id, data, userId) {
    return AboutDocument.findByIdAndUpdate(id, { ...data, updatedBy: userId }, { new: true });
  },
  async deleteDocument(id, userId) {
    return AboutDocument.findByIdAndUpdate(id, { deletedAt: new Date(), updatedBy: userId }, { new: true });
  },

  // PARTNERS
  async getPartners(provinceId) {
    return AboutPartner.find({ provinceId, deletedAt: null }).sort({ displayOrder: 1 });
  },
  async createPartner(provinceId, data, userId) {
    return AboutPartner.create({ ...data, provinceId, createdBy: userId, updatedBy: userId });
  },
  async updatePartner(id, data, userId) {
    return AboutPartner.findByIdAndUpdate(id, { ...data, updatedBy: userId }, { new: true });
  },
  async deletePartner(id, userId) {
    return AboutPartner.findByIdAndUpdate(id, { deletedAt: new Date(), updatedBy: userId }, { new: true });
  },

  // FAQS
  async getFAQs(provinceId) {
    return AboutFAQ.find({ provinceId, deletedAt: null }).sort({ displayOrder: 1 });
  },
  async createFAQ(provinceId, data, userId) {
    return AboutFAQ.create({ ...data, provinceId, createdBy: userId, updatedBy: userId });
  },
  async updateFAQ(id, data, userId) {
    return AboutFAQ.findByIdAndUpdate(id, { ...data, updatedBy: userId }, { new: true });
  },
  async deleteFAQ(id, userId) {
    return AboutFAQ.findByIdAndUpdate(id, { deletedAt: new Date(), updatedBy: userId }, { new: true });
  },

  // GENERIC REORDER
  async reorderItems(Model, items, provinceId, userId) {
    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id, provinceId, deletedAt: null },
        update: { displayOrder: item.displayOrder, updatedBy: userId },
      },
    }));
    return Model.bulkWrite(bulkOps);
  }
};
