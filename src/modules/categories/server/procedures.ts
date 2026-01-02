import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: "categories",
      depth: 1, // Populate subcategories, subcategores.[0] will be a type of "Category"
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name"
    });

    // Custom sort order: All first, then alphabetical, Accessories last
    const customOrder = ['all', 'clothes', 'jewelery', 'posters', 'pottery', 'tattoos', 'music', 'accessories'];
    const sortedData = data.docs.sort((a, b) => {
      const aIndex = customOrder.indexOf(a.slug);
      const bIndex = customOrder.indexOf(b.slug);

      // If both are in custom order, use that order
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }

      // If only one is in custom order, prioritize it
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;

      // Otherwise, sort alphabetically
      return a.name.localeCompare(b.name);
    });

    const formattedData = sortedData.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        // Because of "depth: 1" we are confident "doc" will be a type of "Category"
        ...(doc as Category),
      }))
    }));

    return formattedData
  }),
});
