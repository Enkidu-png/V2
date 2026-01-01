import { getPayload } from "payload";
import config from "@payload-config";

import { stripe } from "./lib/stripe";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Clothes",
    color: "#FF6B9D",
    slug: "clothes",
    subcategories: [
      { name: "T-Shirts", slug: "t-shirts" },
      { name: "Hoodies & Sweatshirts", slug: "hoodies-sweatshirts" },
      { name: "Prints & Graphics", slug: "prints-graphics" },
      { name: "Dresses & Skirts", slug: "dresses-skirts" },
      { name: "Pants & Shorts", slug: "pants-shorts" },
    ],
  },
  {
    name: "Jewelery",
    color: "#FFD700",
    slug: "jewelery",
    subcategories: [
      { name: "Rings", slug: "rings" },
      { name: "Necklaces & Pendants", slug: "necklaces-pendants" },
      { name: "Earrings", slug: "earrings" },
      { name: "Bracelets & Anklets", slug: "bracelets-anklets" },
      { name: "Body Jewelry", slug: "body-jewelry" },
    ],
  },
  {
    name: "Posters",
    color: "#7EC8E3",
    slug: "posters",
    subcategories: [
      { name: "Art Prints", slug: "art-prints" },
      { name: "Photography Prints", slug: "photography-prints" },
      { name: "Vintage & Retro", slug: "vintage-retro" },
      { name: "Music & Band Posters", slug: "music-band-posters" },
      { name: "Movie & TV Posters", slug: "movie-tv-posters" },
    ],
  },
  {
    name: "Pottery",
    color: "#D4A574",
    slug: "pottery",
    subcategories: [
      { name: "Bowls & Dishes", slug: "bowls-dishes" },
      { name: "Mugs & Cups", slug: "mugs-cups" },
      { name: "Vases & Planters", slug: "vases-planters" },
      { name: "Plates & Platters", slug: "plates-platters" },
      { name: "Decorative Pieces", slug: "decorative-pieces" },
    ],
  },
  {
    name: "Accessories",
    color: "#96E6B3",
    slug: "accessories",
    subcategories: [
      { name: "Bags & Totes", slug: "bags-totes" },
      { name: "Hats & Headwear", slug: "hats-headwear" },
      { name: "Pins & Patches", slug: "pins-patches" },
      { name: "Belts & Straps", slug: "belts-straps" },
      { name: "Scarves & Bandanas", slug: "scarves-bandanas" },
    ],
  },
  {
    name: "Tattoos",
    color: "#1A1A1A",
    slug: "tattoos",
    subcategories: [
      { name: "Flash Art", slug: "flash-art" },
      { name: "Custom Designs", slug: "custom-designs" },
      { name: "Temporary Tattoos", slug: "temporary-tattoos" },
      { name: "Tattoo Templates", slug: "tattoo-templates" },
      { name: "Stencils", slug: "stencils" },
    ],
  },
  {
    name: "Music",
    color: "#B5B9FF",
    slug: "music",
    subcategories: [
      { name: "Albums & EPs", slug: "albums-eps" },
      { name: "Singles & Tracks", slug: "singles-tracks" },
      { name: "Vinyl Records", slug: "vinyl-records" },
      { name: "Digital Downloads", slug: "digital-downloads" },
      { name: "Music Merch", slug: "music-merch" },
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
