import { getPayload } from "payload";
import config from "@payload-config";

import { stripe } from "./lib/stripe";

const categories = [
  {
    name: "all",
    slug: "all",
  },
  {
    name: "clothes",
    color: "#FF6B9D",
    slug: "clothes",
    subcategories: [
      { name: "t-shirts", slug: "t-shirts" },
      { name: "hoodies & sweatshirts", slug: "hoodies-sweatshirts" },
      { name: "prints & graphics", slug: "prints-graphics" },
      { name: "dresses & skirts", slug: "dresses-skirts" },
      { name: "pants & shorts", slug: "pants-shorts" },
    ],
  },
  {
    name: "jewelery",
    color: "#FFD700",
    slug: "jewelery",
    subcategories: [
      { name: "rings", slug: "rings" },
      { name: "necklaces & pendants", slug: "necklaces-pendants" },
      { name: "earrings", slug: "earrings" },
      { name: "bracelets & anklets", slug: "bracelets-anklets" },
      { name: "body jewelry", slug: "body-jewelry" },
    ],
  },
  {
    name: "posters",
    color: "#7EC8E3",
    slug: "posters",
    subcategories: [
      { name: "art prints", slug: "art-prints" },
      { name: "photography prints", slug: "photography-prints" },
      { name: "vintage & retro", slug: "vintage-retro" },
      { name: "music & band posters", slug: "music-band-posters" },
      { name: "movie & tv posters", slug: "movie-tv-posters" },
    ],
  },
  {
    name: "pottery",
    color: "#D4A574",
    slug: "pottery",
    subcategories: [
      { name: "bowls & dishes", slug: "bowls-dishes" },
      { name: "mugs & cups", slug: "mugs-cups" },
      { name: "vases & planters", slug: "vases-planters" },
      { name: "plates & platters", slug: "plates-platters" },
      { name: "decorative pieces", slug: "decorative-pieces" },
    ],
  },
  {
    name: "accessories",
    color: "#96E6B3",
    slug: "accessories",
    subcategories: [
      { name: "bags & totes", slug: "bags-totes" },
      { name: "hats & headwear", slug: "hats-headwear" },
      { name: "pins & patches", slug: "pins-patches" },
      { name: "belts & straps", slug: "belts-straps" },
      { name: "scarves & bandanas", slug: "scarves-bandanas" },
    ],
  },
  {
    name: "tattoos",
    color: "#1A1A1A",
    slug: "tattoos",
    subcategories: [
      { name: "flash art", slug: "flash-art" },
      { name: "custom designs", slug: "custom-designs" },
      { name: "temporary tattoos", slug: "temporary-tattoos" },
      { name: "tattoo templates", slug: "tattoo-templates" },
      { name: "stencils", slug: "stencils" },
    ],
  },
  {
    name: "music",
    color: "#B5B9FF",
    slug: "music",
    subcategories: [
      { name: "albums & eps", slug: "albums-eps" },
      { name: "singles & tracks", slug: "singles-tracks" },
      { name: "vinyl records", slug: "vinyl-records" },
      { name: "digital downloads", slug: "digital-downloads" },
      { name: "music merch", slug: "music-merch" },
    ],
  },
]

const seed = async () => {
  const payload = await getPayload({ config });

  const adminAccount = await stripe.accounts.create({});

  // Create admin tenant
  const adminTenant = await payload.create({
    collection: "tenants",
    data: {
      name: "admin",
      slug: "admin",
      stripeAccountId: adminAccount.id,
    },
  });

  // Create admin user
  await payload.create({
    collection: "users",
    data: {
      email: "admin@demo.com",
      password: "demo",
      roles: ["super-admin"],
      username: "admin",
      tenants: [
        {
          tenant: adminTenant.id,
        },
      ],
    },
  });

  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    });

    for (const subCategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subCategory.name,
          slug: subCategory.slug,
          parent: parentCategory.id,
        },
      });
    }
  }
}

try {
  await seed();
  console.log('Seeding completed successfully');
  process.exit(0);
} catch (error) {
  console.error('Error during seeding:', error);
  process.exit(1); // Exit with error code
}
