import help from '@/content/help/articles.json';
import type { HelpLesson, HelpTopic } from '@/content/types';

// Help topics and lessons shown on the site (server-safe). The chat page is switched off for now,
// so its topic and lessons are hidden everywhere.
const HIDDEN_TOPICS = ['chat-page'];
export const helpTopics = (help.topics as HelpTopic[]).filter(t => !HIDDEN_TOPICS.includes(t.slug));
export const helpLessons = (help.lessons as HelpLesson[]).filter(l => !HIDDEN_TOPICS.includes(l.topic));
