import { generateResponse } from "../config/openRouter.js";
import User from "../models/user.model.js";
import website from "../models/website.models.js";

const masterPrompt = `
YOU ARE A WORLD-CLASS PRINCIPAL FRONTEND ENGINEER,
ELITE UI/UX DESIGNER,
AND SENIOR PRODUCT DESIGN ARCHITECT.

YOUR JOB IS TO GENERATE PREMIUM,
REAL-WORLD,
CLIENT-READY,
PRODUCTION-GRADE WEBSITES
USING ONLY:

- HTML
- CSS
- JAVASCRIPT

THE WEBSITE MUST LOOK LIKE IT WAS BUILT BY A TOP-TIER DESIGN AGENCY IN 2026–2027.

==================================================
USER REQUIREMENT:
{USER_PROMPT}
==================================================

CRITICAL OBJECTIVE
==================================================
BUILD A FULLY FUNCTIONAL,
VISUALLY STUNNING,
HIGH-END RESPONSIVE WEBSITE
THAT FEELS:

- MODERN
- PREMIUM
- INTERACTIVE
- CLEAN
- FAST
- PROFESSIONAL
- CONVERSION-FOCUSED

THE OUTPUT MUST FEEL LIKE A REAL STARTUP,
SAAS PRODUCT,
AI TOOL,
AGENCY,
OR MODERN BUSINESS WEBSITE.

==================================================
STRICT RESTRICTIONS
==================================================
❌ NO REACT
❌ NO TAILWIND
❌ NO BOOTSTRAP
❌ NO LIBRARIES
❌ NO FRAMEWORKS
❌ NO PLACEHOLDER TEXT
❌ NO BASIC DESIGNS
❌ NO GENERIC UI
❌ NO EMPTY SECTIONS
❌ NO BROKEN BUTTONS
❌ NO NON-RESPONSIVE LAYOUTS

ONLY PURE:
- HTML
- CSS
- JAVASCRIPT

==================================================
DESIGN QUALITY REQUIREMENTS
==================================================
THE WEBSITE MUST INCLUDE:

✔ Beautiful modern layout
✔ Clean spacing system
✔ Professional typography hierarchy
✔ Strong visual balance
✔ Soft shadows
✔ Premium gradients
✔ Modern card designs
✔ Smooth hover effects
✔ Elegant transitions
✔ Proper alignment
✔ High-end UI aesthetics
✔ Real business-focused content
✔ Interactive feel
✔ Excellent readability
✔ Modern button styles
✔ Responsive navigation
✔ Proper content sections
✔ Modern hero section
✔ Strong CTA sections
✔ Footer with useful links
✔ Professional color system

==================================================
RESPONSIVE DESIGN (MANDATORY)
==================================================
THE WEBSITE MUST BE PERFECTLY RESPONSIVE.

YOU MUST IMPLEMENT:

✔ Mobile-first design
✔ Responsive layout for:
  - Mobile (<768px)
  - Tablet (768px–1024px)
  - Desktop (>1024px)

✔ Flexbox and CSS Grid
✔ Media queries
✔ Relative sizing units
✔ Responsive typography
✔ Responsive spacing
✔ Responsive containers

==================================================
RESPONSIVE BEHAVIOR RULES
==================================================
✔ Navbar adapts on mobile
✔ Mobile menu works properly
✔ Sections stack correctly
✔ Cards become single-column on small screens
✔ Buttons remain touch-friendly
✔ Images resize correctly
✔ Text never overflows
✔ No horizontal scrolling
✔ Layout remains clean on all devices

IF RESPONSIVENESS FAILS → RESPONSE IS INVALID.

==================================================
VISUAL EXPERIENCE REQUIREMENTS
==================================================
THE WEBSITE MUST FEEL:

✔ Cinematic
✔ Modern
✔ Polished
✔ Interactive
✔ High quality
✔ Startup-level
✔ Premium SaaS quality

INCLUDE:

✔ Glassmorphism where appropriate
✔ Gradient backgrounds
✔ Blur effects
✔ Animated hover states
✔ Section transitions
✔ Smooth scrolling
✔ Interactive UI elements
✔ Layered depth design

==================================================
ANIMATION REQUIREMENTS
==================================================
USE PURE CSS/JAVASCRIPT ANIMATIONS ONLY.

INCLUDE:

✔ Fade animations
✔ Hover transitions
✔ Button interactions
✔ Smooth section appearance
✔ Card hover lift
✔ Navigation transitions
✔ Scroll reveal effects
✔ Animated gradients where suitable

ANIMATIONS MUST BE:
- Smooth
- Professional
- Minimal
- Not excessive

==================================================
IMAGES (MANDATORY)
==================================================
ONLY USE IMAGES FROM:

https://images.unsplash.com/

EVERY IMAGE URL MUST INCLUDE:

?auto=format&fit=crop&w=1200&q=80

IMAGE RULES:
✔ Responsive
✔ High quality
✔ Professionally chosen
✔ Relevant to business
✔ Proper aspect ratio
✔ Never stretched
✔ Never overflow containers

==================================================
TECHNICAL REQUIREMENTS
==================================================
✔ Output ONE COMPLETE HTML file
✔ Include EXACTLY ONE <style> tag
✔ Include EXACTLY ONE <script> tag
✔ NO external dependencies
✔ NO external fonts
✔ USE ONLY system fonts
✔ iframe srcdoc compatible
✔ Clean readable code
✔ Semantic HTML structure
✔ Accessible layout
✔ Functional JavaScript

==================================================
SPA APPLICATION REQUIREMENTS
==================================================
CREATE A MODERN SPA-STYLE WEBSITE.

REQUIRED PAGES/SECTIONS:
✔ Home
✔ About
✔ Services / Features
✔ Pricing (if relevant)
✔ Testimonials
✔ Contact
✔ Footer

NAVIGATION MUST:
✔ Work with JavaScript
✔ Switch sections/pages smoothly
✔ Update active state
✔ Work on mobile devices

==================================================
FUNCTIONALITY REQUIREMENTS
==================================================
✔ Working navigation
✔ Working forms with validation
✔ Interactive buttons
✔ Functional mobile menu
✔ Smooth transitions
✔ Scroll interactions
✔ Realistic UI behavior
✔ Working CTA buttons

==================================================
CONTENT REQUIREMENTS
==================================================
✔ Use REALISTIC BUSINESS CONTENT
✔ Write professional headlines
✔ Write modern marketing copy
✔ Create believable startup/product text
✔ Avoid lorem ipsum completely
✔ Make content feel premium and realistic

==================================================
PERFORMANCE RULES
==================================================
✔ Fast-loading layout
✔ Efficient CSS
✔ Lightweight JavaScript
✔ Optimized structure
✔ Smooth rendering

==================================================
IMPORTANT VISIBILITY RULE
==================================================
✔ At least ONE section/page MUST be visible immediately
✔ Never hide entire body
✔ Never render blank screen
✔ Never use display:none for all sections
✔ Website MUST render visible UI immediately
✔ The generated HTML must render visible content immediately inside <body>
✔ Do not generate empty body or hidden content

==================================================
FINAL SELF-CHECK BEFORE RESPONSE
==================================================
ENSURE:

1. Website works perfectly on mobile
2. No horizontal scrolling
3. Layout is visually premium
4. All buttons work
5. Navigation works
6. Images are responsive
7. Content is visible immediately
8. CSS is complete
9. JavaScript is functional
10. UI feels production-ready
11. Website looks modern and high-end
12. No broken layout exists

IF ANY CHECK FAILS → RESPONSE IS INVALID.

==================================================
OUTPUT FORMAT (MANDATORY)
==================================================
RETURN ONLY A COMPLETE HTML DOCUMENT.

RULES:
✔ Start with <!DOCTYPE html>
✔ Return full HTML only
✔ No markdown
✔ No JSON
✔ No explanations
✔ No code blocks
✔ Include exactly one <style> tag
✔ Include exactly one <script> tag

==================================================

`;

export const generateWebsite = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "prompt is required" });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (user.credits < 50) {
      return res
        .status(400)
        .json({ message: "you have not enough credits to generate a website" });
    }
    const finalPrompt = masterPrompt.replace("USER_PROMPT", prompt);
    const raw = await generateResponse(finalPrompt);

    let cleanCode = raw
      .replace(/```html/g, "")
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      const parsed = JSON.parse(cleanCode);

      cleanCode = parsed.code || parsed.html || parsed.website || cleanCode;
    } catch (error) {
      // AI returned raw HTML directly
    }

    if (!cleanCode.includes("<html")) {
      console.log("invalid ai response", cleanCode);

      return res.status(400).json({
        message: "Invalid AI response",
      });
    }

    const Website = await website.create({
      user: user._id,
      title: prompt.slice(0, 60),
      latestCode: cleanCode,
      conversation: [
        {
          role: "user",
          content: prompt,
        },
        {
          role: "ai",
          content: "Website generated successfully",
        },
      ],
    });

    user.credits = user.credits - 50;
    await user.save();

    return res
      .status(200)
      .json({ websiteId: Website._id, remainingCredits: user.credits });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `generate website error :${error}` });
  }
};

export const getWebsiteById = async (req, res) => {
  try {
    const Website = await website.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!Website) {
      return res.status(400).json({ message: "website not found" });
    }
    return res.status(200).json(Website);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `get website by id error :${error}` });
  }
};

export const changes = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "prompt is required" });
    }
    const Website = await website.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!Website) {
      return res.status(400).json({ message: "website not found" });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (user.credits < 25) {
      return res
        .status(400)
        .json({ message: "you have not enough credits to generate a website" });
    }

    const updatePrompt = `
YOU ARE A WORLD-CLASS PRINCIPAL FRONTEND ENGINEER,
ELITE UI/UX DESIGNER,
AND SENIOR PRODUCT DESIGN ARCHITECT.

YOUR JOB IS TO UPDATE AND IMPROVE AN EXISTING WEBSITE
USING ONLY:

- HTML
- CSS
- JAVASCRIPT

==================================================
CURRENT WEBSITE CODE:
${Website?.latestCode}
==================================================

USER UPDATE REQUEST:
${prompt}
==================================================

CRITICAL OBJECTIVE
==================================================
UPDATE THE EXISTING WEBSITE BASED ON THE USER REQUEST.

YOU MUST:
✔ Preserve the existing website purpose
✔ Preserve useful existing content
✔ Improve only what user requested
✔ Keep the design premium and modern
✔ Keep the website fully responsive
✔ Return the FULL UPDATED HTML file
✔ Do not return only changed parts

==================================================
STRICT RULES
==================================================
❌ NO REACT
❌ NO TAILWIND
❌ NO BOOTSTRAP
❌ NO LIBRARIES
❌ NO FRAMEWORKS
❌ NO MARKDOWN
❌ NO EXPLANATIONS
❌ NO PARTIAL CODE
❌ NO BROKEN BUTTONS
❌ NO EMPTY BODY
❌ NO HIDDEN FULL PAGE

ONLY PURE:
- HTML
- CSS
- JAVASCRIPT

==================================================
QUALITY ENHANCEMENT RULES
==================================================
THE UPDATED WEBSITE MUST HAVE:

✔ Premium UI quality
✔ Clean responsive layout
✔ Professional spacing
✔ Modern typography
✔ Smooth transitions
✔ Working navigation
✔ Functional buttons
✔ Functional mobile menu
✔ Working form validation
✔ Improved visual hierarchy
✔ No layout breaking
✔ No horizontal scroll
✔ Visible content immediately

==================================================
RESPONSIVE REQUIREMENTS
==================================================
THE UPDATED WEBSITE MUST WORK ON:

✔ Mobile (<768px)
✔ Tablet (768px–1024px)
✔ Desktop (>1024px)

YOU MUST KEEP OR ADD:

✔ Media queries
✔ Flexbox/Grid layouts
✔ Responsive containers
✔ Responsive images
✔ Touch-friendly buttons
✔ Mobile-friendly navigation

==================================================
IMPORTANT UPDATE BEHAVIOR
==================================================
✔ Apply the user's requested change clearly
✔ Do not remove important existing sections unless requested
✔ Do not simplify the design
✔ Do not downgrade UI quality
✔ Do not break existing navigation
✔ Do not break existing JavaScript
✔ Do not remove responsiveness
✔ Do not return blank content
✔ If adding new UI, match the existing style
✔ If fixing bugs, preserve the website structure

==================================================
IMAGES RULE
==================================================
If images are added or replaced, use only:

https://images.unsplash.com/

Every image URL must include:

?auto=format&fit=crop&w=1200&q=80

Images must be responsive and never overflow.

==================================================
OUTPUT FORMAT
==================================================


==================================================

`;

    const raw = await generateResponse(updatePrompt);

    const cleanCode = raw
      .replace(/```html/g, "")
      .replace(/```/g, "")
      .trim();

    if (!cleanCode.includes("<html") && !cleanCode.includes("<!DOCTYPE html")) {
      console.log("invalid ai response", cleanCode);

      return res.status(400).json({
        message: "Invalid AI response",
      });
    }
    Website.conversation.push(
      { role: "user", content: prompt },
      { role: "ai", content: "Website updated successfully" },
    );

    Website.latestCode = cleanCode;
    await Website.save();

    user.credits = user.credits - 25;
    await user.save();

    return res.status(200).json({
      mmessage: "Website updated successfully",
      code: cleanCode,
      remainingCredits: user.credits,
    });
  } catch (error) {
    return res.status(500).json({ message: `update website error ${error}` });
  }
};

export const getAll = async (req, res) => {
  try {
    const websites = await website.find({ user: req.user._id });
    return res.status(200).json(websites);
  } catch (error) {
    return res.status(500).json({ message: `getAll websites error ${error}` });
  }
};

export const deploy = async (req, res) => {
  try {
    const Website = await website.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!Website) {
      return res.status(400).json({ message: "website not found" });
    }

    if (!Website.slug) {
      Website.slug =
        Website.title
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "")
          .slice(0, 60) + Website._id.toString().slice(-5);
    }

    Website.deployed = true;
    Website.deployUrl = `${process.env.FRONTEND_URL}/site/${Website.slug}`;

    await Website.save();

    return res.status(200).json({
      url: Website.deployUrl,
      slug: Website.slug,
    });
  } catch (error) {
    return res.status(500).json({
      message: `deploy website error ${error}`,
    });
  }
};

export const getBySlug = async (req, res) => {
  try {
    const Website = await website.findOne({
      slug: req.params.slug,
      deployed: true,
    });

    if (!Website) {
      return res.status(404).json({
        message: "website not found",
        slug: req.params.slug,
      });
    }

    return res.status(200).json({
      title: Website.title,
      latestCode: Website.latestCode,
    });
  } catch (error) {
    return res.status(500).json({
      message: `get by slug website error ${error}`,
    });
  }
};
