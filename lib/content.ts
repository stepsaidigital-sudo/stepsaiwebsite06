// Subpage copy, one JSON file per page. Each file is registered here so the
// type check fails when a file is missing a field or has the wrong shape.
// JSON imports widen string literals, so files are checked against Json<T>
// and the exact literal fields (kind, status) are checked by lint:copy.
import type { ComparePage, CaseStudiesHub, CaseStudyPage, ChannelPage, IntegrationPage, IntegrationsHub, ContentPage, FeaturePage, HubPage, IndustryPage, PricingPage, UseCasePage } from '@/content/types';
import whatsappBroadcast from '@/content/features/whatsapp-broadcast.json';
import whatsappChatbot from '@/content/channels/whatsapp-chatbot.json';
import aiSalesAgent from '@/content/use-cases/ai-sales-agent.json';
import ecommerce from '@/content/industries/ecommerce.json';
import analyticsFeatureJson from '@/content/features/analytics.json';
import crmFeatureJson from '@/content/features/crm.json';
import skillsFeatureJson from '@/content/features/skills.json';
import unifiedInboxFeatureJson from '@/content/features/unified-inbox.json';
import whatsappBroadcastFeatureJson from '@/content/features/whatsapp-broadcast.json';
import workflowBuilderFeatureJson from '@/content/features/workflow-builder.json';
import chatPageChannelJson from '@/content/channels/chat-page.json';
import instagramChatbotChannelJson from '@/content/channels/instagram-chatbot.json';
import messengerChatbotChannelJson from '@/content/channels/messenger-chatbot.json';
import websiteChatbotChannelJson from '@/content/channels/website-chatbot.json';
import whatsappChatbotChannelJson from '@/content/channels/whatsapp-chatbot.json';
import aiBookingAgentUseCaseJson from '@/content/use-cases/ai-booking-agent.json';
import aiLeadCaptureAgentUseCaseJson from '@/content/use-cases/ai-lead-capture-agent.json';
import aiMarketingAgentUseCaseJson from '@/content/use-cases/ai-marketing-agent.json';
import aiReceptionistUseCaseJson from '@/content/use-cases/ai-receptionist.json';
import aiSalesAgentUseCaseJson from '@/content/use-cases/ai-sales-agent.json';
import aiSupportAgentUseCaseJson from '@/content/use-cases/ai-support-agent.json';
import ecommerceIndustryJson from '@/content/industries/ecommerce.json';
import educationIndustryJson from '@/content/industries/education.json';
import financialServicesIndustryJson from '@/content/industries/financial-services.json';
import healthcareIndustryJson from '@/content/industries/healthcare.json';
import realEstateIndustryJson from '@/content/industries/real-estate.json';
import saasIndustryJson from '@/content/industries/saas.json';
import travelAndHospitalityIndustryJson from '@/content/industries/travel-and-hospitality.json';
import industriesHub from '@/content/hubs/industries.json';
import pricingPage from '@/content/pages/pricing.json';
import aboutPage from '@/content/pages/about.json';
import notFoundPage from '@/content/pages/not-found.json';
import integrationsHub from '@/content/hubs/integrations.json';
import caseStudiesHub from '@/content/hubs/case-studies.json';
import compareHub from '@/content/hubs/compare.json';
import vsAisensy from '@/content/compare/aisensy.json';
import vsChatbase from '@/content/compare/chatbase.json';
import vsGorgias from '@/content/compare/gorgias.json';
import vsManychat from '@/content/compare/manychat.json';
import vsTidio from '@/content/compare/tidio.json';
import vsVerifast from '@/content/compare/verifast.json';
import vsWati from '@/content/compare/wati.json';
import partnersPage from '@/content/pages/partners.json';
import affiliateProgramPage from '@/content/pages/affiliate-program.json';
import hireAnAgencyPage from '@/content/pages/hire-an-agency.json';
import foundersNotePage from '@/content/pages/founders-note.json';
import careersPage from '@/content/pages/careers.json';
import teamPage from '@/content/pages/team.json';
import contactPage from '@/content/pages/contact.json';
import securityPage from '@/content/pages/security.json';
import privacyPolicyPage from '@/content/pages/privacy-policy.json';
import termsOfServicePage from '@/content/pages/terms-of-service.json';
import aiBookingAgentCase from '@/content/case-studies/ai-booking-agent.json';
import aiLeadCaptureAgentCase from '@/content/case-studies/ai-lead-capture-agent.json';
import aiMarketingAgentCase from '@/content/case-studies/ai-marketing-agent.json';
import aiReceptionistCase from '@/content/case-studies/ai-receptionist.json';
import aiSalesAgentCase from '@/content/case-studies/ai-sales-agent.json';
import aiSupportAgentCase from '@/content/case-studies/ai-support-agent.json';
import airtableIntegration from '@/content/integrations/airtable.json';
import calComIntegration from '@/content/integrations/cal-com.json';
import calendlyIntegration from '@/content/integrations/calendly.json';
import delhiveryIntegration from '@/content/integrations/delhivery.json';
import dtdcIntegration from '@/content/integrations/dtdc.json';
import googleCalendarIntegration from '@/content/integrations/google-calendar.json';
import googleDriveIntegration from '@/content/integrations/google-drive.json';
import googleSheetsIntegration from '@/content/integrations/google-sheets.json';
import hubspotIntegration from '@/content/integrations/hubspot.json';
import ithinkLogisticsIntegration from '@/content/integrations/ithink-logistics.json';
import klaviyoIntegration from '@/content/integrations/klaviyo.json';
import notionIntegration from '@/content/integrations/notion.json';
import outlookCalendarIntegration from '@/content/integrations/outlook-calendar.json';
import outlookIntegration from '@/content/integrations/outlook.json';
import shiprocketIntegration from '@/content/integrations/shiprocket.json';
import shopifyIntegration from '@/content/integrations/shopify.json';
import slackIntegration from '@/content/integrations/slack.json';
import squareAppointmentsIntegration from '@/content/integrations/square-appointments.json';
import wareiqIntegration from '@/content/integrations/wareiq.json';
import woocommerceIntegration from '@/content/integrations/woocommerce.json';
import zendeskIntegration from '@/content/integrations/zendesk.json';

type Json<T> = T extends string ? string : T extends (infer U)[] ? Json<U>[] : T extends object ? { [K in keyof T]: Json<T[K]> } : T;

const features = { 'analytics': analyticsFeatureJson, 'crm': crmFeatureJson, 'skills': skillsFeatureJson, 'unified-inbox': unifiedInboxFeatureJson, 'whatsapp-broadcast': whatsappBroadcastFeatureJson, 'workflow-builder': workflowBuilderFeatureJson } satisfies Record<string, Json<FeaturePage>>;
const channels = { 'chat-page': chatPageChannelJson, 'instagram-chatbot': instagramChatbotChannelJson, 'messenger-chatbot': messengerChatbotChannelJson, 'website-chatbot': websiteChatbotChannelJson, 'whatsapp-chatbot': whatsappChatbotChannelJson } satisfies Record<string, Json<ChannelPage>>;
const useCases = { 'ai-booking-agent': aiBookingAgentUseCaseJson, 'ai-lead-capture-agent': aiLeadCaptureAgentUseCaseJson, 'ai-marketing-agent': aiMarketingAgentUseCaseJson, 'ai-receptionist': aiReceptionistUseCaseJson, 'ai-sales-agent': aiSalesAgentUseCaseJson, 'ai-support-agent': aiSupportAgentUseCaseJson } satisfies Record<string, Json<UseCasePage>>;
const industries = { 'ecommerce': ecommerceIndustryJson, 'education': educationIndustryJson, 'financial-services': financialServicesIndustryJson, 'healthcare': healthcareIndustryJson, 'real-estate': realEstateIndustryJson, 'saas': saasIndustryJson, 'travel-and-hospitality': travelAndHospitalityIndustryJson } satisfies Record<string, Json<IndustryPage>>;
const integrations = { 'airtable': airtableIntegration, 'cal-com': calComIntegration, 'calendly': calendlyIntegration, 'delhivery': delhiveryIntegration, 'dtdc': dtdcIntegration, 'google-calendar': googleCalendarIntegration, 'google-drive': googleDriveIntegration, 'google-sheets': googleSheetsIntegration, 'hubspot': hubspotIntegration, 'ithink-logistics': ithinkLogisticsIntegration, 'klaviyo': klaviyoIntegration, 'notion': notionIntegration, 'outlook-calendar': outlookCalendarIntegration, 'outlook': outlookIntegration, 'shiprocket': shiprocketIntegration, 'shopify': shopifyIntegration, 'slack': slackIntegration, 'square-appointments': squareAppointmentsIntegration, 'wareiq': wareiqIntegration, 'woocommerce': woocommerceIntegration, 'zendesk': zendeskIntegration } satisfies Record<string, Json<IntegrationPage>>;
const integrationsIndex = integrationsHub satisfies Json<IntegrationsHub>;
const caseStudies = { 'ai-booking-agent': aiBookingAgentCase, 'ai-lead-capture-agent': aiLeadCaptureAgentCase, 'ai-marketing-agent': aiMarketingAgentCase, 'ai-receptionist': aiReceptionistCase, 'ai-sales-agent': aiSalesAgentCase, 'ai-support-agent': aiSupportAgentCase } satisfies Record<string, Json<CaseStudyPage>>;
const caseStudiesIndex = caseStudiesHub satisfies Json<CaseStudiesHub>;
const compares = { 'aisensy': vsAisensy, 'chatbase': vsChatbase, 'gorgias': vsGorgias, 'manychat': vsManychat, 'tidio': vsTidio, 'verifast': vsVerifast, 'wati': vsWati } satisfies Record<string, Json<ComparePage>>;
const hubs = { industries: industriesHub, compare: compareHub } satisfies Record<string, Json<HubPage>>;
const pricing = pricingPage satisfies Json<PricingPage>;
const pages = { about: aboutPage, 'not-found': notFoundPage, 'partners': partnersPage, 'affiliate-program': affiliateProgramPage, 'hire-an-agency': hireAnAgencyPage, 'founders-note': foundersNotePage, 'careers': careersPage, 'team': teamPage, 'contact': contactPage, 'security': securityPage, 'privacy-policy': privacyPolicyPage, 'terms-of-service': termsOfServicePage } satisfies Record<string, Json<ContentPage>>;

function lookup<T>(pages: Record<string, unknown>) {
  return {
    get: (slug: string) => (Object.hasOwn(pages, slug) ? pages[slug] as T : undefined),
    list: () => Object.keys(pages),
  };
}

const f = lookup<FeaturePage>(features), c = lookup<ChannelPage>(channels), u = lookup<UseCasePage>(useCases), i = lookup<IndustryPage>(industries), g = lookup<IntegrationPage>(integrations), cs = lookup<CaseStudyPage>(caseStudies), cp = lookup<ComparePage>(compares);
export const getFeature = f.get, listFeatures = f.list;
export const getChannel = c.get, listChannels = c.list;
export const getUseCase = u.get, listUseCases = u.list;
export const getIndustry = i.get, listIndustries = i.list;
export const getHub = (name: keyof typeof hubs) => hubs[name] as HubPage;
export const getPricing = () => pricing as PricingPage;
export const getPage = (name: keyof typeof pages) => pages[name] as ContentPage;
export const getIntegration = g.get, listIntegrations = g.list;
export const getIntegrationsHub = () => integrationsIndex as IntegrationsHub;
export const getCaseStudy = cs.get, listCaseStudies = cs.list;
export const getCaseStudiesHub = () => caseStudiesIndex as CaseStudiesHub;
export const getCompare = cp.get, listCompares = cp.list;
