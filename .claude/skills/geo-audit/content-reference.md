# Content Optimization for GEO

## Meta Description Guidelines

AI search engines use meta descriptions to understand page content. Optimize for clarity and facts over marketing.

### Current Issues (Typical)
- Too long or too short
- Marketing-focused instead of informative
- Missing key entities
- Generic descriptions

### Optimal Format

**Length**: 150-160 characters
**Structure**: [What it is] + [Key benefit/feature] + [Differentiator]

### Examples by Page Type

**Homepage**:
```
Current: "Transform your fitness journey with Hoppa's AI-powered pose detection..."
Better: "Hoppa is a mobile fitness app using AI pose detection to provide real-time form feedback during workouts. Available on iOS and Android."
```

**Blog Post**:
```
"Learn the 5 most common squat form mistakes and how Hoppa's AI pose detection identifies and corrects them in real-time."
```

**Forum**:
```
"Join the Hoppa fitness community to discuss workouts, share progress, and get tips from other users training with AI pose detection."
```

**Feature Page**:
```
"Hoppa's AI analyzes 17 body landmarks to detect exercise form issues and count reps automatically. No video leaves your device."
```

## Heading Hierarchy

AI engines use headings to understand content structure.

### Rules
1. **One H1 per page** - The main topic
2. **H2s for sections** - Major content divisions
3. **H3s for subsections** - Details within sections
4. **Never skip levels** - Don't go H1 → H3

### Example Structure

```html
<h1>AI-Powered Fitness Training with Hoppa</h1>

<h2>How Pose Detection Works</h2>
<h3>On-Device Machine Learning</h3>
<h3>Real-Time Form Analysis</h3>

<h2>Supported Exercises</h2>
<h3>Strength Training</h3>
<h3>Cardio Movements</h3>
<h3>Recovery & Stretching</h3>

<h2>Getting Started</h2>
<h3>Download the App</h3>
<h3>Complete Your First Workout</h3>
```

## E-E-A-T Signals

Google and AI engines prioritize content showing Expertise, Experience, Authority, and Trust.

### Expertise Signals

Add technical depth:

```markdown
## How Our Pose Detection Works

Hoppa uses a convolutional neural network trained on millions of exercise
videos to identify 17 key body landmarks in real-time. The model runs
entirely on your device using Core ML (iOS) or TensorFlow Lite (Android),
achieving inference times under 30ms per frame.

Our form analysis compares your joint angles against biomechanically
optimal ranges derived from sports science research...
```

### Experience Signals

Show real results:

```markdown
## User Results

"After 3 months with Hoppa, I finally fixed my squat depth issue.
The real-time feedback showed me I was stopping 4 inches too high."
— Sarah M., using Hoppa since January 2025

Average improvement metrics:
- 34% better form scores after 2 weeks
- 89% of users complete their first campaign
- 4.2 workouts per week average engagement
```

### Authority Signals

Demonstrate credentials:

```markdown
## About Our Team

Hoppa was founded by fitness professionals and machine learning engineers
with backgrounds from [University/Company]. Our exercise library is
developed in consultation with certified personal trainers (NASM, ACE).

## Research & Methodology

Our pose detection approach is based on peer-reviewed research in
computer vision and biomechanics. See our technical blog for details
on our methodology.
```

### Trust Signals

Show transparency:

```markdown
## Privacy First

- All pose detection runs on your device
- No video data is ever uploaded
- Your workout data is encrypted
- You can export or delete your data anytime
- SOC 2 Type II compliant infrastructure

## Contact Us

Questions? Reach us at support@hoppa.fit
```

## FAQ Content

AI engines love FAQ content - it matches how users query them.

### Implementation

Add FAQ sections to relevant pages:

```tsx
// components/FAQSection.tsx
const faqs = [
  {
    question: "How does Hoppa's AI detect my exercise form?",
    answer: "Hoppa uses computer vision to track 17 points on your body through your phone camera. It compares your positions against optimal form and provides real-time feedback. All processing happens on your device - no video is uploaded."
  },
  {
    question: "What exercises can Hoppa track?",
    answer: "Hoppa currently supports 50+ exercises including squats, push-ups, lunges, planks, burpees, and more. We add new exercises monthly based on user requests."
  },
  {
    question: "Do I need special equipment?",
    answer: "No equipment required. Hoppa works with bodyweight exercises. Just prop your phone where it can see your full body and you're ready to train."
  },
  {
    question: "Is Hoppa free?",
    answer: "Hoppa offers a free tier with basic workouts and pose detection. Premium unlocks all campaigns, advanced analytics, and personalized training plans."
  },
  {
    question: "Does Hoppa work offline?",
    answer: "Yes, core features work offline. The AI runs entirely on your device. Internet is only needed for syncing progress and community features."
  }
];
```

### Where to Add FAQs

- **Homepage**: General product FAQs
- **Pricing page**: Payment and subscription FAQs
- **Feature pages**: Technical FAQs about that feature
- **Blog posts**: Topic-specific FAQs at the end

## Citation Opportunities

Link to authoritative sources to boost credibility:

### Types of Citations

1. **Research Studies**
   ```markdown
   Research shows proper squat form reduces knee injury risk by 56%
   [Journal of Strength & Conditioning](https://example.com/study).
   ```

2. **Official Guidelines**
   ```markdown
   Following ACSM guidelines, we recommend 150 minutes of moderate
   exercise weekly for general fitness.
   ```

3. **Industry Standards**
   ```markdown
   Our trainers hold certifications from NASM, ACE, and NSCA.
   ```

4. **Technical References**
   ```markdown
   Our pose estimation builds on the MoveNet architecture,
   optimized for mobile inference.
   ```

## Content Structure for AI

### Answer-First Writing

AI engines extract answers. Put key information first:

**Bad**:
```
When it comes to fitness apps, there are many options available today.
After much consideration, you might find that AI-powered solutions
offer unique benefits. Hoppa is one such app that uses pose detection...
```

**Good**:
```
Hoppa is an AI-powered fitness app that uses pose detection to analyze
your exercise form in real-time. The app provides instant feedback on
17 body landmarks, helping you maintain proper technique and avoid injury.
```

### Use Concrete Numbers

AI engines prefer specific data:

- "34% improvement" > "significant improvement"
- "50+ exercises" > "many exercises"
- "under 30ms latency" > "fast response"
- "4.8 star rating from 1,250 reviews" > "highly rated"
