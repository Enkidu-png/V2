<project_specification>
  <project_name>Ferment Platforma - Multi-Tenant E-Commerce with Platform Fees</project_name>

  <overview>
    Build a comprehensive multi-tenant e-commerce platform called "Ferment Platforma" that enables vendors to create their own online stores with automatic platform fee collection. The application features subdomain-based vendor stores, Stripe Connect integration for payments, product catalogs with rich content, user purchase libraries, review systems, and a complete admin dashboard. Built with Next.js 15, Payload CMS, and modern React patterns, the platform supports wildcard subdomain routing, role-based access control, and seamless vendor onboarding.
  </overview>

  <technology_stack>
    <api_key>
        Stripe API keys are required for payment processing and are configured via environment variables (STRIPE_SECRET_KEY). Database connections use MongoDB Atlas URI. Vercel Blob storage is used for media files.
    </api_key>
    <frontend>
      <framework>Next.js 15 with App Router</framework>
      <styling>TailwindCSS V4 with custom design system</styling>
      <state_management>tRPC with TanStack Query for server state, Zustand for client state</state_management>
      <routing>Next.js App Router with middleware-based subdomain routing</routing>
      <ui_components>ShadcnUI component library with Radix UI primitives</ui_components>
      <forms>React Hook Form with Zod validation</forms>
      <fonts>DM Sans for body text, Poppins for branding</fonts>
      <port>Default Next.js port (3000) with subdomain middleware</port>
    </frontend>
    <backend>
      <cms>Payload CMS 3.34 with multi-tenant plugin</cms>
      <database>MongoDB Atlas with Mongoose adapter</database>
      <api>tRPC for type-safe API layer</api>
      <storage>Vercel Blob Storage for media files</storage>
      <authentication>Payload CMS auth with custom cookie handling</authentication>
    </backend>
    <payments>
      <provider>Stripe Connect for multi-party payments</provider>
      <platform_fees>10% automatic platform fee collection</platform_fees>
      <checkout>Stripe Checkout Sessions with custom success/cancel URLs</checkout>
      <webhooks>Stripe webhook handling for payment events</webhooks>
    </payments>
    <communication>
      <api>tRPC procedures for type-safe client-server communication</api>
      <realtime>Server-Sent Events support (configurable)</realtime>
      <subdomain_routing>Middleware-based tenant routing with wildcard DNS</subdomain_routing>
    </communication>
  </technology_stack>

  <prerequisites>
    <environment_setup>
      - Node.js 18+ or Bun 1.0+ runtime
      - MongoDB Atlas account for database
      - Stripe account with Connect enabled
      - Vercel account for Blob storage
      - Domain with wildcard DNS support for subdomains
      - Environment variables: DATABASE_URI, STRIPE_SECRET_KEY, PAYLOAD_SECRET, BLOB_READ_WRITE_TOKEN
    </environment_setup>
    <development_setup>
      - pnpm/bun/npm for package management
      - Payload CMS CLI for database operations
      - Stripe CLI for webhook testing (optional)
    </development_setup>
  </prerequisites>

  <core_features>
    <multi_tenant_architecture>
      - Isolated tenant stores with unique subdomains (tenant-slug.yourdomain.com)
      - Payload CMS multi-tenant plugin for data isolation
      - Automatic tenant creation during user registration
      - Super-admin access across all tenants
      - Tenant-specific product catalogs and media
      - Role-based access control (super-admin, user)
    </multi_tenant_architecture>

    <vendor_onboarding>
      - Seamless registration with automatic Stripe account creation
      - Stripe Connect onboarding flow for payment verification
      - Store name and slug configuration
      - Email verification and account setup
      - Dashboard access post-verification
      - Platform fee transparency (10% of all transactions)
    </vendor_onboarding>

    <storefront_management>
      - Custom merchant storefronts with tenant branding
      - Product catalog with categories and tags
      - Rich text product descriptions and content
      - Image and media upload support
      - Private products (hidden from public catalog)
      - Product archiving and status management
      - Refund policy configuration per product
    </storefront_management>

    <payment_processing>
      - Stripe Connect integration for vendor payments
      - Automatic 10% platform fee deduction
      - Secure checkout sessions with customer email
      - Invoice generation and payment tracking
      - Multi-product cart checkout
      - Success/cancel URL handling per tenant
      - Payment metadata tracking for order management
    </payment_processing>

    <user_purchase_library>
      - Personal purchase history and library access
      - Digital product downloads and content access
      - Order tracking and status updates
      - Purchased content protection and access control
      - Cross-tenant purchase history
      - Downloadable product materials
    </user_purchase_library>

    <product_catalog>
      - Public marketplace with all tenant products
      - Advanced filtering by category and tags
      - Search functionality across products
      - Product ratings and review system
      - Price display and comparison
      - Tenant store linking and navigation
      - Product detail pages with rich content
      - Image galleries and media display
    </product_catalog>

    <review_rating_system>
      - Star-based product ratings (1-5 stars)
      - Customer review comments and feedback
      - Review aggregation and display
      - Review count and average rating calculation
      - Review management in admin dashboard
      - Review filtering and sorting options
    </review_rating_system>

    <admin_dashboard>
      - Payload CMS admin interface
      - Tenant-specific data management
      - Product CRUD operations
      - Order and customer management
      - Media library management
      - Category and tag organization
      - Review moderation tools
      - Analytics and reporting (basic)
    </admin_dashboard>

    <content_management>
      - Rich text editor for product descriptions
      - Protected content areas for purchased materials
      - Media upload and management
      - Category hierarchy and organization
      - Tag-based content classification
      - Content versioning and archiving
    </content_management>

    <routing_domain_management>
      - Wildcard subdomain routing (tenant.yourdomain.com)
      - Development fallback routing (/tenants/tenant-slug)
      - Middleware-based tenant resolution
      - Domain configuration for production
      - SSL certificate support for subdomains
      - SEO-friendly URL structures
    </routing_domain_management>

    <authentication_authorization>
      - Email/password authentication
      - Session management with secure cookies
      - Cross-domain cookie support for subdomains
      - User role management (super-admin, user)
      - Tenant association and access control
      - Protected routes and API endpoints
      - Session validation and renewal
    </authentication_authorization>

    <search_filtering>
      - Global product search across all tenants
      - Category-based filtering
      - Tag-based filtering
      - Price range filtering
      - Search result pagination
      - Search highlighting and relevance
      - Advanced query capabilities
    </search_filtering>

    <responsive_design>
      - Mobile-first responsive design
      - Adaptive layouts for all screen sizes
      - Touch-optimized interactions
      - Progressive Web App capabilities
      - Cross-browser compatibility
      - Accessibility compliance (WCAG guidelines)
    </responsive_design>
  </core_features>

  <database_schema>
    <collections>
      <users>
        - id, email, username (unique), password (hashed)
        - roles (array: super-admin, user)
        - tenants (relationship array to tenant access)
        - created_at, updated_at
        - Authentication handled by Payload CMS
      </users>

      <tenants>
        - id, name (store name), slug (unique subdomain)
        - stripeAccountId (Stripe Connect account)
        - stripeDetailsSubmitted (verification status)
        - image (store logo/avatar)
        - created_at, updated_at
        - Multi-tenant isolation via Payload plugin
      </tenants>

      <products>
        - id, name, description (rich text), price (USD)
        - category (relationship), tags (relationship array)
        - image (main product image), cover (hero image)
        - content (protected rich text for purchasers)
        - refundPolicy (select: 30-day, 14-day, 7-day, 3-day, 1-day, no-refunds)
        - isPrivate (boolean), isArchived (boolean)
        - tenant (relationship for multi-tenant isolation)
        - created_at, updated_at
      </products>

      <categories>
        - id, name, description
        - parent_category (self-referencing for hierarchy)
        - image (category icon/image)
        - tenant (relationship for multi-tenant isolation)
        - created_at, updated_at
      </categories>

      <tags>
        - id, name, color (for UI display)
        - description, usage_count
        - tenant (relationship for multi-tenant isolation)
        - created_at, updated_at
      </tags>

      <orders>
        - id, user (relationship), tenant (relationship)
        - products (relationship array), total_amount
        - stripe_payment_intent_id, status
        - platform_fee_amount, vendor_earnings
        - created_at, updated_at
        - Order tracking and history
      </orders>

      <reviews>
        - id, user (relationship), product (relationship)
        - rating (1-5 stars), comment (rich text)
        - is_verified_purchase (boolean)
        - created_at, updated_at
        - Review aggregation for product ratings
      </reviews>

      <media>
        - id, filename, filesize, mimeType
        - url (Vercel Blob Storage), alt_text
        - tenant (relationship for multi-tenant isolation)
        - created_at, updated_at
        - Image and file management
      </media>
    </collections>
  </database_schema>

  <api_endpoints_summary>
    <authentication>
      - POST /api/auth/login - User login with email/password
      - POST /api/auth/logout - User logout and session cleanup
      - GET /api/auth/session - Get current user session
      - POST /api/auth/register - User registration with tenant creation
    </authentication>

    <tenants>
      - GET /api/tenants - List tenants (admin only)
      - GET /api/tenants/:id - Get tenant details
      - PUT /api/tenants/:id - Update tenant information
      - DELETE /api/tenants/:id - Delete tenant (admin only)
    </tenants>

    <products>
      - GET /api/products - List products with filtering/pagination
      - POST /api/products - Create product (tenant admin)
      - GET /api/products/:id - Get product details
      - PUT /api/products/:id - Update product
      - DELETE /api/products/:id - Delete product
      - GET /api/products/search - Search products
    </products>

    <checkout>
      - POST /api/checkout/purchase - Create Stripe checkout session
      - POST /api/checkout/verify - Create Stripe account verification link
      - GET /api/checkout/products - Get products for checkout
    </checkout>

    <orders>
      - GET /api/orders - List user orders
      - GET /api/orders/:id - Get order details
      - PUT /api/orders/:id/status - Update order status
    </orders>

    <reviews>
      - GET /api/reviews - List product reviews
      - POST /api/reviews - Create product review
      - PUT /api/reviews/:id - Update review
      - DELETE /api/reviews/:id - Delete review
    </reviews>

    <library>
      - GET /api/library/products - Get user's purchased products
      - GET /api/library/downloads - Get downloadable content
    </library>

    <admin>
      - GET /api/admin/dashboard - Dashboard analytics
      - GET /api/admin/tenants - Tenant management
      - GET /api/admin/orders - Order management
      - GET /api/admin/products - Product management
    </admin>
  </api_endpoints_summary>

  <ui_layout>
    <main_structure>
      - Public marketplace homepage with featured products
      - Tenant-specific store pages with custom branding
      - User dashboard and purchase library
      - Admin dashboard with Payload CMS interface
      - Authentication pages (sign-in/sign-up)
      - Responsive navigation with mobile sidebar
    </main_structure>

    <public_marketplace>
      - Hero section with platform branding
      - Featured products carousel
      - Product grid with filtering and search
      - Category navigation and browsing
      - Vendor store links and discovery
      - User authentication prompts
    </public_marketplace>

    <tenant_storefront>
      - Custom store header with tenant branding
      - Product catalog with tenant-specific products
      - Store information and contact details
      - Purchase flow integration
      - Review and rating display
      - Social proof and credibility indicators
    </tenant_storefront>

    <user_dashboard>
      - Purchase history and order tracking
      - Digital library access
      - Downloadable content management
      - Account settings and preferences
      - Review management
      - Subscription and billing information
    </user_dashboard>

    <admin_interface>
      - Payload CMS admin panel
      - Tenant-specific data management
      - Product CRUD interface
      - Order management and fulfillment
      - Customer communication tools
      - Analytics and reporting dashboard
      - Stripe account management
    </admin_interface>

    <authentication_flows>
      - Sign-in page with email/password
      - Sign-up page with tenant creation
      - Password reset functionality
      - Email verification flow
      - Social login options (extensible)
      - Multi-factor authentication (future)
    </authentication_flows>
  </ui_layout>

  <design_system>
    <color_palette>
      - Primary: Black (#000000) with pink accent (#EC4899)
      - Background: White (#FFFFFF) for main content
      - Surface: Light gray (#F8F9FA) for cards and sections
      - Text: Dark gray (#374151) for body text
      - Borders: Light gray (#E5E7EB) for dividers
      - Success: Green (#10B981) for confirmations
      - Error: Red (#EF4444) for errors
      - Warning: Yellow (#F59E0B) for warnings
    </color_palette>

    <typography>
      - Primary font: DM Sans (Google Fonts)
      - Heading font: Poppins Bold for branding
      - Base font size: 16px with responsive scaling
      - Line height: 1.6 for readability
      - Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
      - Code blocks: Monospace font family
    </typography>

    <components>
      <buttons>
        - Primary: Black background with white text, pink hover
        - Secondary: White background with black border, pink hover
        - Outline: Transparent with black border
        - Ghost: Transparent with subtle hover effects
        - Rounded corners and consistent padding
        - Loading states with spinner animation
      </buttons>

      <cards>
        - White background with subtle shadows
        - Rounded corners (8px border radius)
        - Consistent padding (24px)
        - Hover effects with shadow increase
        - Border variations for different content types
      </cards>

      <forms>
        - Clean input fields with focus states
        - Error states with red borders and messages
        - Success states with green validation
        - Consistent spacing and alignment
        - Accessibility labels and descriptions
        - React Hook Form integration
      </forms>

      <navigation>
        - Fixed header navigation
        - Mobile-responsive sidebar
        - Active state indicators
        - Smooth transitions and animations
        - Dropdown menus for complex navigation
      </navigation>
    </components>

    <animations>
      - Smooth transitions (200-300ms duration)
      - Fade-in animations for content loading
      - Hover effects on interactive elements
      - Loading spinners and skeleton states
      - Slide animations for mobile navigation
      - Micro-interactions for user feedback
    </animations>
  </design_system>

  <key_interactions>
    <vendor_onboarding_flow>
      1. User visits sign-up page and enters credentials
      2. System creates user account and Stripe Connect account
      3. Automatic tenant creation with unique slug
      4. Redirect to Stripe onboarding for verification
      5. Upon completion, user gains access to admin dashboard
      6. Store becomes live with subdomain routing
    </vendor_onboarding_flow>

    <purchase_flow>
      1. Customer browses marketplace or tenant store
      2. Adds products to cart (single or multiple items)
      3. Initiates checkout with Stripe session creation
      4. Redirects to Stripe hosted checkout page
      5. Customer completes payment with card details
      6. Automatic platform fee deduction (10%)
      7. Redirect to success page with order confirmation
      8. Vendor receives earnings, customer gains library access
    </purchase_flow>

    <product_management_flow>
      1. Vendor logs into admin dashboard
      2. Navigates to products section in Payload CMS
      3. Creates new product with rich content and media
      4. Sets pricing, categories, and visibility options
      5. Configures protected content for purchasers
      6. Publishes product to live storefront
      7. Monitors sales and manages inventory
    </product_management_flow>

    <subdomain_routing_flow>
      1. Customer visits tenant-specific subdomain
      2. Middleware intercepts request and extracts tenant slug
      3. Rewrites URL to internal tenant route
      4. Payload CMS serves tenant-specific content
      5. All links and navigation maintain subdomain context
      6. Cross-domain authentication handled seamlessly
    </subdomain_routing_flow>
  </key_interactions>

  <implementation_steps>
    <step number="1">
      <title>Setup Project Foundation and Multi-Tenant Architecture</title>
      <tasks>
        - Configure Next.js 15 with App Router and TypeScript
        - Set up Payload CMS with MongoDB and multi-tenant plugin
        - Configure Vercel Blob Storage for media files
        - Implement middleware for subdomain routing
        - Set up tRPC with type-safe API layer
        - Configure environment variables and secrets
        - Initialize database schema with tenant isolation
      </tasks>
    </step>

    <step number="2">
      <title>Implement Authentication and User Management</title>
      <tasks>
        - Set up Payload CMS authentication system
        - Create user registration with automatic tenant creation
        - Implement Stripe Connect account creation
        - Build sign-in/sign-up UI components
        - Configure cross-domain cookie handling
        - Implement role-based access control
        - Create user dashboard and profile management
      </tasks>
    </step>

    <step number="3">
      <title>Build Public Marketplace and Storefront</title>
      <tasks>
        - Create marketplace homepage with product discovery
        - Implement product catalog with filtering and search
        - Build tenant storefront pages with custom branding
        - Add product detail pages with rich content
        - Implement review and rating system
        - Create responsive navigation and layout
        - Add image upload and media management
      </tasks>
    </step>

    <step number="4">
      <title>Integrate Stripe Connect and Payment Processing</title>
      <tasks>
        - Set up Stripe Connect for multi-party payments
        - Implement vendor onboarding flow
        - Create checkout session generation
        - Build payment success/cancel handling
        - Implement platform fee calculation and collection
        - Add webhook handling for payment events
        - Create order tracking and management
      </tasks>
    </step>

    <step number="5">
      <title>Develop User Library and Purchase Management</title>
      <tasks>
        - Build user purchase library interface
        - Implement digital content access and downloads
        - Create order history and tracking
        - Add protected content delivery
        - Implement download management
        - Build receipt and invoice generation
        - Add purchase verification for reviews
      </tasks>
    </step>

    <step number="6">
      <title>Create Admin Dashboard and CMS</title>
      <tasks>
        - Configure Payload CMS admin interface
        - Build tenant-specific content management
        - Implement product CRUD operations
        - Create order management interface
        - Add customer communication tools
        - Build analytics and reporting dashboard
        - Implement bulk operations and data export
      </tasks>
    </step>

    <step number="7">
      <title>Implement Advanced Features and Polish</title>
      <tasks>
        - Add comprehensive search and filtering
        - Implement category and tag management
        - Build review moderation system
        - Add email notifications and communication
        - Implement SEO optimization and meta tags
        - Add performance optimizations and caching
        - Create comprehensive testing suite
        - Implement error handling and logging
      </tasks>
    </step>

    <step number="8">
      <title>Deploy and Configure Production Environment</title>
      <tasks>
        - Set up Vercel deployment with custom domain
        - Configure wildcard DNS for subdomains
        - Set up SSL certificates for all domains
        - Configure production database and storage
        - Implement monitoring and error tracking
        - Set up backup and disaster recovery
        - Configure CI/CD pipeline for deployments
        - Perform security audit and penetration testing
      </tasks>
    </step>
  </implementation_steps>

  <success_criteria>
    <functionality>
      - Multi-tenant architecture with complete data isolation
      - Stripe Connect integration with automatic fee collection
      - Subdomain routing working across all tenant stores
      - Product catalog with rich content and media support
      - User authentication and role-based access control
      - Purchase flow with secure payment processing
      - User library with protected content access
      - Admin dashboard with full CMS capabilities
      - Review and rating system with aggregation
      - Search and filtering across all products
    </functionality>

    <user_experience>
      - Responsive design working on all device sizes
      - Fast loading times with optimized performance
      - Intuitive navigation and user flows
      - Clear error messages and validation feedback
      - Seamless authentication across subdomains
      - Professional storefront appearance
      - Accessible interface following WCAG guidelines
      - Mobile-optimized checkout and purchase flows
    </user_experience>

    <technical_quality>
      - Type-safe codebase with TypeScript throughout
      - Secure authentication and data handling
      - Optimized database queries and performance
      - Comprehensive error handling and logging
      - Automated testing with good coverage
      - Clean, maintainable code architecture
      - Proper API documentation and typing
      - Scalable multi-tenant data architecture
    </technical_quality>

    <business_requirements>
      - 10% platform fee automatically collected on all transactions
      - Vendor onboarding completed within Stripe Connect flow
      - Subdomain routing supporting unlimited tenant stores
      - Product catalog supporting digital and physical goods
      - User library providing permanent access to purchases
      - Admin dashboard enabling full store management
      - Review system building trust and social proof
      - Search functionality driving product discovery
    </business_requirements>
  </success_criteria>
</project_specification>