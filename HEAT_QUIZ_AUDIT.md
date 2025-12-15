# Heat Quiz Scoring Audit

## Scoring System Overview

**Total Questions:** 4
**Points per Option:** 0, 1, 2, or 3
**Maximum Possible Points:** 12

## Point-to-Heat Level Mapping

| Points | Heat Level | Name | Description |
|--------|------------|------|-------------|
| 0-2 | Level 1 | Mild | New to hot sauce, avoid spice |
| 3-5 | Level 2 | Medium | Casual user, Tabasco/Sriracha level |
| 6-8 | Level 3 | Hot | Enthusiast, seeks out hot sauces |
| 9-10 | Level 4 | Extra Hot | Advanced, loves serious heat |
| 11-12 | Level 5 | Extreme | Ghost peppers are fun |

## Expected Product Recommendations by Level

### Level 1 (Mild) - 0-2 Points
**Currently:** No products tagged as heat-1 in Shopify
**Recommendation:** Either:
- Tag BBQ rubs as Level 1 (gentle heat)
- Or show Level 2 products with a note they're beginner-friendly

### Level 2 (Medium) - 3-5 Points
**Products:**
- Series 1 - Sweet Heat ($12.00)
- Series 1 - Cucumber Madness ($12.00)
- Series 1 - Pineapple-Mango ($12.00)
- Beekeepers Blend BBQ Rub ($15.00)
- Aztec Gold BBQ Rub ($15.00)
- Wildwood Maple BBQ Rub ($15.00)

### Level 3 (Hot) - 6-8 Points
**Products:**
- Series 2 - Wide Awake ($15.00)
- Series 2 - Leprechaun Lava ($15.00)
- Series 2 - Clove Keeper ($15.00)
- Series 3 - Blazin' Bee Mustard ($16.00)

### Level 4 (Extra Hot) - 9-10 Points
**Products:**
- Series 3 - Sapphire Dragon ($16.00)
- Series 3 - Bangkok Burn ($16.00)

### Level 5 (Extreme) - 11-12 Points
**Products:**
- Garlic Reaper (if tagged as heat-5)

## User Journey Testing

### Journey 1: Complete Beginner
```
Q1: "I'm new to hot sauce" → 0 points
Q2: "I tend to avoid spicy food" → 0 points
Q3: "Add flavor without too much heat" → 0 points
Q4: "That's pretty hot for me" → 0 points
TOTAL: 0 points → Level 1 (Mild) ✅
```
**Expected:** Products with gentle heat or message about Level 2 being beginner-friendly

### Journey 2: Casual User (Tabasco Level)
```
Q1: "I use Tabasco or Sriracha regularly" → 1 point
Q2: "I enjoy a little kick" → 1 point
Q3: "Balance of flavor and heat" → 1 point
Q4: "Nice warmth, very manageable" → 1 point
TOTAL: 4 points → Level 2 (Medium) ✅
```
**Expected:** Sweet Heat, Cucumber Madness, Pineapple-Mango

### Journey 3: Mid-Level Enthusiast
```
Q1: "I use Tabasco or Sriracha regularly" → 1 point
Q2: "I love when my mouth is on fire" → 2 points
Q3: "Balance of flavor and heat" → 1 point
Q4: "I can eat them raw like candy" → 2 points
TOTAL: 6 points → Level 3 (Hot) ✅
```
**Expected:** Wide Awake, Leprechaun Lava, Clove Keeper

### Journey 4: Serious Enthusiast
```
Q1: "I seek out hot sauces wherever I go" → 2 points
Q2: "I love when my mouth is on fire" → 2 points
Q3: "Primarily for the heat" → 2 points
Q4: "I can eat them raw like candy" → 2 points
TOTAL: 8 points → Level 3 (Hot) ✅
```
**Expected:** Wide Awake, Leprechaun Lava, Clove Keeper, Blazin' Bee Mustard

### Journey 5: Advanced Heat Seeker
```
Q1: "I seek out hot sauces wherever I go" → 2 points
Q2: "Nothing is ever hot enough for me" → 3 points
Q3: "Primarily for the heat" → 2 points
Q4: "I can eat them raw like candy" → 2 points
TOTAL: 9 points → Level 4 (Extra Hot) ✅
```
**Expected:** Sapphire Dragon, Bangkok Burn

### Journey 6: Mixed Enthusiast
```
Q1: "I eat ghost peppers for fun" → 3 points
Q2: "I love when my mouth is on fire" → 2 points
Q3: "Primarily for the heat" → 2 points
Q4: "I can eat them raw like candy" → 2 points
TOTAL: 9 points → Level 4 (Extra Hot) ✅
```
**Expected:** Sapphire Dragon, Bangkok Burn

### Journey 7: Extreme Heat Warrior
```
Q1: "I eat ghost peppers for fun" → 3 points
Q2: "Nothing is ever hot enough for me" → 3 points
Q3: "Maximum heat, always" → 3 points
Q4: "Jalapeños are basically bell peppers to me" → 3 points
TOTAL: 12 points → Level 5 (Extreme) ✅
```
**Expected:** Garlic Reaper (if available)

### Journey 8: Conflicted User (wants heat but cautious)
```
Q1: "I use Tabasco or Sriracha regularly" → 1 point
Q2: "I enjoy a little kick" → 1 point
Q3: "Primarily for the heat" → 2 points
Q4: "Nice warmth, very manageable" → 1 point
TOTAL: 5 points → Level 2 (Medium) ✅
```
**Expected:** Sweet Heat, Cucumber Madness, Pineapple-Mango

### Journey 9: Ghost Pepper Lover but Balanced
```
Q1: "I eat ghost peppers for fun" → 3 points
Q2: "Nothing is ever hot enough for me" → 3 points
Q3: "Balance of flavor and heat" → 1 point
Q4: "Jalapeños are basically bell peppers to me" → 3 points
TOTAL: 10 points → Level 4 (Extra Hot) ✅
```
**Expected:** Sapphire Dragon, Bangkok Burn

### Journey 10: Maximum Heat Seeker (Almost Extreme)
```
Q1: "I eat ghost peppers for fun" → 3 points
Q2: "Nothing is ever hot enough for me" → 3 points
Q3: "Maximum heat, always" → 3 points
Q4: "I can eat them raw like candy" → 2 points
TOTAL: 11 points → Level 5 (Extreme) ✅
```
**Expected:** Garlic Reaper

## Quiz Questions Analysis

### Question 1: Experience Level
- **0 points:** "I'm new to hot sauce" → Beginners
- **1 point:** "I use Tabasco or Sriracha regularly" → Casual users
- **2 points:** "I seek out hot sauces wherever I go" → Enthusiasts
- **3 points:** "I eat ghost peppers for fun" → Extreme users

**Assessment:** ✅ Well-distributed, clear progression

### Question 2: Reaction to Spice
- **0 points:** "I tend to avoid spicy food" → Heat-averse
- **1 point:** "I enjoy a little kick" → Mild preference
- **2 points:** "I love when my mouth is on fire" → Heat lover
- **3 points:** "Nothing is ever hot enough for me" → Extreme seeker

**Assessment:** ✅ Clear escalation, matches experience levels

### Question 3: Purpose/Goal
- **0 points:** "Add flavor without too much heat" → Flavor-focused
- **1 point:** "Balance of flavor and heat" → Balanced approach
- **2 points:** "Primarily for the heat" → Heat-focused
- **3 points:** "Maximum heat, always" → Extreme heat focus

**Assessment:** ✅ Good progression, captures user intent

### Question 4: Jalapeño Tolerance (Reference Point)
- **0 points:** "That's pretty hot for me" → Low tolerance (~5K SHU is hot)
- **1 point:** "Nice warmth, very manageable" → Moderate tolerance
- **2 points:** "I can eat them raw like candy" → High tolerance
- **3 points:** "Jalapeños are basically bell peppers to me" → Extreme tolerance

**Assessment:** ✅ Excellent reference point, jalapeños are universally known

## Distribution Analysis

### Point Distribution (All Possible Scores)
- 0 points: Level 1 (1 combination) - 0.39%
- 1 point: Level 1 (4 combinations) - 1.56%
- 2 points: Level 1 (10 combinations) - 3.91%
- 3 points: Level 2 (16 combinations) - 6.25%
- 4 points: Level 2 (31 combinations) - 12.11%
- 5 points: Level 2 (40 combinations) - 15.63%
- 6 points: Level 3 (44 combinations) - 17.19%
- 7 points: Level 3 (40 combinations) - 15.63%
- 8 points: Level 3 (31 combinations) - 12.11%
- 9 points: Level 4 (20 combinations) - 7.81%
- 10 points: Level 4 (10 combinations) - 3.91%
- 11 points: Level 5 (4 combinations) - 1.56%
- 12 points: Level 5 (1 combination) - 0.39%

### Level Distribution
- **Level 1 (Mild):** ~5.86% of users
- **Level 2 (Medium):** ~33.99% of users
- **Level 3 (Hot):** ~44.93% of users
- **Level 4 (Extra Hot):** ~11.72% of users
- **Level 5 (Extreme):** ~1.95% of users

**Assessment:** ✅ Distribution matches typical hot sauce consumer base:
- Most users fall into Medium-Hot range (Level 2-3)
- Extreme heat seekers are rare (Level 5)
- Good bell curve distribution

## Recommendations

### 1. Level 1 Products
**Issue:** Very few users will score Level 1 (only ~6%), and we may not have heat-1 products

**Solutions:**
- Option A: Tag BBQ rubs as `heat-1` (they have milder heat)
- Option B: Show Level 2 products with message: "These medium sauces are perfect for beginners"
- Option C: Adjust threshold so 0-3 points = Level 2 (merge Level 1 into Level 2)

**Recommended:** Option B - Show Level 2 products with beginner-friendly message

### 2. Product Name Display
**Implemented:** ✅
- Product names now show prominently in a list before the cards
- Shows product title and price
- Visual flame icon for each product
- Clear "Perfect Sauces For Your Heat Level" heading

### 3. Score Transparency
**Implemented:** ✅
- Shows "You scored X out of 12 points"
- Helps users understand their result
- Can retake quiz to see different levels

### 4. No Products Message
**Implemented:** ✅
- Shows friendly message if no products exist for that heat level
- Encourages browsing all products
- Prevents empty state confusion

## Shopify Tag Requirements

To make the quiz work perfectly, ensure these tags are set:

```
Series 1 Hot Sauces: heat-2
Series 2 Hot Sauces: heat-3
Series 3 - Sapphire Dragon: heat-4
Series 3 - Bangkok Burn: heat-4
Series 3 - Blazin' Bee Mustard: heat-3
BBQ Rubs: heat-2 (or heat-1 if preferred)
Garlic Reaper: heat-5
```

## Conclusion

✅ **Quiz Scoring:** Accurate and well-distributed
✅ **Question Design:** Clear progression, good reference points
✅ **Heat Level Mapping:** Matches product lineup
✅ **Product Display:** Names shown prominently with prices
✅ **User Experience:** Score displayed, retake option, empty state handled

**Overall Assessment:** The heat quiz accurately determines user heat tolerance and recommends appropriate products. The scoring system is well-balanced with most users falling into the Medium-Hot range where most products are available.
