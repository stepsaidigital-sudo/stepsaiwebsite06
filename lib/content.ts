// Subpage copy, one JSON file per page. Each file is registered here so the
// type check fails when a file is missing a field or has the wrong shape.
// JSON imports widen string literals, so files are checked against Json<T>
// and the exact literal fields (kind, status) are checked by lint:copy.
import type { ChannelPage, FeaturePage, IndustryPage, UseCasePage } from '@/content/types';
import whatsappBroadcast from '@/content/features/whatsapp-broadcast.json';
import whatsappChatbot from '@/content/channels/whatsapp-chatbot.json';
import aiSalesAgent from '@/content/use-cases/ai-sales-agent.json';

type Json<T> = T extends string ? string : T extends (infer U)[] ? Json<U>[] : T extends object ? { [K in keyof T]: Json<T[K]> } : T;

const features = { 'whatsapp-broadcast': whatsappBroadcast } satisfies Record<string, Json<FeaturePage>>;
const channels = { 'whatsapp-chatbot': whatsappChatbot } satisfies Record<string, Json<ChannelPage>>;
const useCases = { 'ai-sales-agent': aiSalesAgent } satisfies Record<string, Json<UseCasePage>>;
const industries = {} satisfies Record<string, Json<IndustryPage>>;

function lookup<T>(pages: Record<string, unknown>) {
  return {
    get: (slug: string) => (Object.hasOwn(pages, slug) ? pages[slug] as T : undefined),
    list: () => Object.keys(pages),
  };
}

const f = lookup<FeaturePage>(features), c = lookup<ChannelPage>(channels), u = lookup<UseCasePage>(useCases), i = lookup<IndustryPage>(industries);
export const getFeature = f.get, listFeatures = f.list;
export const getChannel = c.get, listChannels = c.list;
export const getUseCase = u.get, listUseCases = u.list;
export const getIndustry = i.get, listIndustries = i.list;
