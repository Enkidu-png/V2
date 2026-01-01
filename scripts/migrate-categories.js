#!/usr/bin/env node

/**
 * FERMENT Category Migration Script
 *
 * This script migrates the database from old categories to new FERMENT categories.
 * Run this script to update your MongoDB database with the new category structure.
 *
 * Usage:
 * 1. Make sure your MongoDB is running
 * 2. Set your DATABASE_URI environment variable
 * 3. Run: node scripts/migrate-categories.js
 */

import { MongoClient } from 'mongodb';

// Database connection
const uri = process.env.DATABASE_URI || 'mongodb://localhost:27017/ferment';
const client = new MongoClient(uri);

// New category structure (lowercase names)
const newCategories = [
  {
    name: "all",
    slug: "all",
    color: null,
    parent: null,
  },
  {
    name: "clothes",
    slug: "clothes",
    color: "#FF6B9D",
    parent: null,
  },
  {
    name: "jewelery",
    slug: "jewelery",
    color: "#FFD700",
    parent: null,
  },
  {
    name: "posters",
    slug: "posters",
    color: "#7EC8E3",
    parent: null,
  },
  {
    name: "pottery",
    slug: "pottery",
    color: "#D4A574",
    parent: null,
  },
  {
    name: "accessories",
    slug: "accessories",
    color: "#96E6B3",
    parent: null,
  },
  {
    name: "tattoos",
    slug: "tattoos",
    color: "#1A1A1A",
    parent: null,
  },
  {
    name: "music",
    slug: "music",
    color: "#B5B9FF",
    parent: null,
  },
];

// Subcategories data
const subcategoriesData = {
  clothes: [
    { name: "t-shirts", slug: "t-shirts" },
    { name: "hoodies & sweatshirts", slug: "hoodies-sweatshirts" },
    { name: "prints & graphics", slug: "prints-graphics" },
    { name: "dresses & skirts", slug: "dresses-skirts" },
    { name: "pants & shorts", slug: "pants-shorts" },
  ],
  jewelery: [
    { name: "rings", slug: "rings" },
    { name: "necklaces & pendants", slug: "necklaces-pendants" },
    { name: "earrings", slug: "earrings" },
    { name: "bracelets & anklets", slug: "bracelets-anklets" },
    { name: "body jewelry", slug: "body-jewelry" },
  ],
  posters: [
    { name: "art prints", slug: "art-prints" },
    { name: "photography prints", slug: "photography-prints" },
    { name: "vintage & retro", slug: "vintage-retro" },
    { name: "music & band posters", slug: "music-band-posters" },
    { name: "movie & tv posters", slug: "movie-tv-posters" },
  ],
  pottery: [
    { name: "bowls & dishes", slug: "bowls-dishes" },
    { name: "mugs & cups", slug: "mugs-cups" },
    { name: "vases & planters", slug: "vases-planters" },
    { name: "plates & platters", slug: "plates-platters" },
    { name: "decorative pieces", slug: "decorative-pieces" },
  ],
  accessories: [
    { name: "bags & totes", slug: "bags-totes" },
    { name: "hats & headwear", slug: "hats-headwear" },
    { name: "pins & patches", slug: "pins-patches" },
    { name: "belts & straps", slug: "belts-straps" },
    { name: "scarves & bandanas", slug: "scarves-bandanas" },
  ],
  tattoos: [
    { name: "flash art", slug: "flash-art" },
    { name: "custom designs", slug: "custom-designs" },
    { name: "temporary tattoos", slug: "temporary-tattoos" },
    { name: "tattoo templates", slug: "tattoo-templates" },
    { name: "stencils", slug: "stencils" },
  ],
  music: [
    { name: "albums & eps", slug: "albums-eps" },
    { name: "singles & tracks", slug: "singles-tracks" },
    { name: "vinyl records", slug: "vinyl-records" },
    { name: "digital downloads", slug: "digital-downloads" },
    { name: "music merch", slug: "music-merch" },
  ],
};

async function migrateCategories() {
  try {
    console.log('🔄 Starting FERMENT category migration...');

    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    const categoriesCollection = db.collection('categories');

    // Step 1: Delete all existing categories
    console.log('🗑️  Deleting existing categories...');
    const deleteResult = await categoriesCollection.deleteMany({});
    console.log(`✅ Deleted ${deleteResult.deletedCount} existing categories`);

    // Step 2: Insert new parent categories
    console.log('📝 Inserting new parent categories...');
    const parentCategories = await categoriesCollection.insertMany(newCategories);
    console.log(`✅ Inserted ${parentCategories.insertedCount} parent categories`);

    // Step 3: Create subcategories for each parent
    console.log('📝 Creating subcategories...');
    let totalSubcategories = 0;

    for (const [parentSlug, subcategories] of Object.entries(subcategoriesData)) {
      // Find the parent category
      const parentCategory = await categoriesCollection.findOne({ slug: parentSlug });
      if (!parentCategory) {
        console.error(`❌ Parent category '${parentSlug}' not found`);
        continue;
      }

      // Create subcategories with parent reference
      const subcategoryDocs = subcategories.map(sub => ({
        name: sub.name,
        slug: sub.slug,
        color: null,
        parent: parentCategory._id,
      }));

      const result = await categoriesCollection.insertMany(subcategoryDocs);
      totalSubcategories += result.insertedCount;
      console.log(`✅ Created ${result.insertedCount} subcategories for ${parentSlug}`);
    }

    console.log(`✅ Total subcategories created: ${totalSubcategories}`);

    // Step 4: Verification
    console.log('🔍 Verifying migration...');
    const totalCategories = await categoriesCollection.countDocuments();
    const parentCount = await categoriesCollection.countDocuments({ parent: null });
    const childCount = await categoriesCollection.countDocuments({ parent: { $ne: null } });

    console.log(`📊 Migration Summary:`);
    console.log(`   - Total categories: ${totalCategories}`);
    console.log(`   - Parent categories: ${parentCount}`);
    console.log(`   - Subcategories: ${childCount}`);

    // Step 5: Show sample categories
    console.log('📋 Sample categories created:');
    const sampleCategories = await categoriesCollection.find({}).limit(5).toArray();
    sampleCategories.forEach(cat => {
      console.log(`   - ${cat.name} (${cat.slug}) ${cat.parent ? '[subcategory]' : '[parent]'}`);
    });

    console.log('🎉 FERMENT category migration completed successfully!');
    console.log('💡 Next steps:');
    console.log('   1. Restart your Payload server');
    console.log('   2. Check Payload admin panel for new categories');
    console.log('   3. Test category navigation on frontend');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the migration
migrateCategories().catch(console.error);