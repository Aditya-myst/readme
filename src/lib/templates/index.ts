import { ProfileState, TemplateType } from "@/store/profileStore";
import { pro } from './pro';
import { architect } from './architect';
import { influencer } from './influencer';
import { poweruser } from './poweruser';
import { minimal } from './minimal';
import { retro } from './retro';
import { fullstack } from './fullstack';
import { opensource } from './opensource';
import { aiml } from './aiml';
import { devops } from './devops';
import { polyglot } from './polyglot';
import { gamer } from './gamer';
import { designer } from './designer';
import { student } from './student';
import { terminal } from './terminal';
import { minimalist_mono } from './minimalist_mono';
import { ai_engineer } from './ai_engineer';

export const templates: Record<TemplateType, { title: string; category: string; description: string; render: (data: ProfileState) => string }> = {
  pro,
  architect,
  influencer,
  poweruser,
  minimal,
  retro,
  fullstack,
  opensource,
  aiml,
  devops,
  polyglot,
  gamer,
  designer,
  student,
  terminal,
  minimalist_mono,
  ai_engineer,
};
