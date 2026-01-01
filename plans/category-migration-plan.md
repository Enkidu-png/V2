# FERMENT Category Migration Plan

## Current State Analysis

### Database Structure
The application uses **PayloadCMS** with a self-referential category structure:

**Category Schema** ([`src/collections/Categories.ts`](src/collections/Categories.ts:1)):
- `name` (text, required) - Display name
- `slug` (text, required, unique, indexed) - URL-friendly identifier
- `color` (text, optional) - Category color code
- `parent` (relationship to categories) - Links to parent category
- `subcategories` (join field) - Virtual field showing child categories

**Current Categories** (11 total from [`seed.ts`](src/seed.ts:6)):
1. All
2. Business & Money (9 subcategories)
3. Software Development (5 subcategories)
4. Writing & Publishing (5 subcategories)
5. Other
6. Education (4 subcategories)
7. Self Improvement (4 subcategories)
8. Fitness & Health (4 subcategories)
9. Design (4 subcategories)
10. Drawing & Painting (5 subcategories)
11. Music (4 subcategories)
12. Photography (5 subcategories)

**Product Relationship**:
- Products have a single `category` relationship field
- Categories are used for filtering and navigation

## New Category Schema

### Main Categories (7 + 1 "All")

I've designed subcategories optimized for a creative marketplace selling physical and digital goods:

```typescript
const newCategories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Clothes",
    color: "#FF6B9D",  // Pink
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
    color: "#FFD700",  // Gold
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
    color: "#7EC8E3",  // Light Blue
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
    color: "#D4A574",  // Clay/Terracotta
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
    color: "#96E6B3",  // Mint Green
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
    color: "#1A1A1A",  // Black
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
    color: "#B5B9FF",  // Lavender
    slug: "music",
    subcategories: [
      { name: "Albums & EPs", slug: "albums-eps" },
      { name: "Singles & Tracks", slug: "singles-tracks" },
      { name: "Vinyl Records", slug: "vinyl-records" },
      { name: "Digital Downloads", slug: "digital-downloads" },
      { name: "Music Merch", slug: "music-merch" },
    ],
  },
];
```

**Total**: 8 parent categories, 40 subcategories

## Implementation Strategy

### Approach: Seed File Replacement

Since this is a new platform (likely in development/testing phase), the cleanest approach is to:

1. **Update the seed file** ([`src/seed.ts`](src/seed.ts:6)) with new categories
2. **Clear the database** and re-seed with new structure
3. **No migration script needed** - fresh start

**Why this approach?**
- Database appears to be in development phase
- No mention of production data that needs preservation
- Simpler than writing complex migration scripts
- Ensures clean slate for new category structure

### Alternative: Migration Script (if needed)

If there's existing data to preserve, we would need:
- Delete all existing categories
- Create new categories with relationships
- Update existing products to map to new categories
- Handle orphaned products (assign to "Other" or leave null)

## Files to Modify

### 1. [`src/seed.ts`](src/seed.ts:6)
**Changes**: Replace entire `categories` array (lines 6-140) with new structure

### 2. No changes needed to:
- [`src/collections/Categories.ts`](src/collections/Categories.ts:1) - Schema remains the same
- [`src/collections/Products.ts`](src/collections/Products.ts:1) - Category relationship unchanged
- [`src/payload.config.ts`](src/payload.config.ts:1) - Config unchanged
- [`src/payload-types.ts`](src/payload-types.ts:1) - Auto-generated, no manual changes

## Testing Checklist

After implementation:

- [ ] Database seeds successfully with new categories
- [ ] All 8 parent categories appear in admin panel
- [ ] All 40 subcategories are linked to correct parents
- [ ] Category colors display correctly
- [ ] Category slugs are URL-safe and unique
- [ ] Frontend category navigation shows new categories
- [ ] Product creation allows selecting new categories
- [ ] Category filtering works on product listings
- [ ] Subcategory menu displays correctly
- [ ] No broken relationships or orphaned data

## Rollback Plan

If issues arise:
1. Switch back to `master` branch
2. Re-seed with original categories from master
3. Database returns to original state

**Note**: This is why we're using the `CATEGORIES` branch for testing

## Color Palette Rationale

Selected colors complement the FERMENT brand aesthetic:
- **Clothes** (#FF6B9D): Pink - Fashion/Style
- **Jewelery** (#FFD700): Gold - Precious/Luxury
- **Posters** (#7EC8E3): Light Blue - Visual/Creative
- **Pottery** (#D4A574): Clay/Terracotta - Earthy/Handmade
- **Accessories** (#96E6B3): Mint Green - Fresh/Trendy
- **Tattoos** (#1A1A1A): Black - Bold/Edgy
- **Music** (#B5B9FF): Lavender - Creative/Artistic

## Next Steps

1. ✅ Create CATEGORIES branch (completed)
2. Update [`src/seed.ts`](src/seed.ts:6) with new category structure
3. Clear local database
4. Run seed script: `npm run payload seed`
5. Verify categories in Payload admin panel
6. Test frontend category navigation
7. Commit changes to CATEGORIES branch
8. Push to GitHub for testing/review
9. Merge to master when approved

---

**Ready to implement?** The next step is updating the seed file with the new category structure defined above.