export type Collection = {
  id: string;
  number: number;
  title: string;
  slug: string;
  description?: string;
};

export const collections: Collection[] = [
  {
    id: "collection-1",
    number: 1,
    title: "COMMAND",
    slug: "command",
    description: "The debut chapter. A monochrome study in refusal, uniform, and craft.",
  },
  {
    id: "collection-2",
    number: 2,
    title: "CAUGHT ON FILM",
    slug: "caught-on-film",
    description: "A film-burn study in memory, motion, and after-hours glamour.",
  },
];

export const getCollection = (id: string) => collections.find((c) => c.id === id);
