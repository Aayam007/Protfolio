# Assignment 6: State Management in ASP.NET Core
## CSC367: NET Centric Computing

---

**SYLLABUS ALIGNMENT:** Unit 6 - State Management on ASP.NET Core Application  
**SYLLABUS TOPICS COVERED:**
- 6.1 State Management on stateless HTTP
- 6.2 Server-side strategies: Session State, TempData, HttpContext, Cache
- 6.3 Client-side strategies: Cookies, Query Strings, Hidden Fields

**COURSE LEARNING OUTCOME:** CLO5 - Apply state management techniques and client-side technologies in web applications  
**ASSIGNMENT TYPE:** Practical Programming Assignment  
**TOTAL MARKS:** 20  
**DUE DATE:** Week 18 (As per course schedule)  
**SUBMISSION MODE:** Code + Documentation (PDF Report)

---

## Assignment Objectives

By completing this assignment, students will be able to:

1. Understand the stateless nature of HTTP protocol and need for state management
2. Implement server-side state management techniques (Session, TempData, Cache)
3. Implement client-side state management techniques (Cookies, Query Strings)
4. Choose appropriate state management strategy based on requirements
5. Handle state data securely and efficiently
6. Compare performance and security of different state management approaches

---

## Instructions to Students

### General Guidelines
1. Use **ASP.NET Core MVC** (.NET Core 3.1 or higher) for all implementations
2. Create a **single solution** with separate controllers/views for each question
3. Write **clean, well-commented code** following C# naming conventions
4. Include **proper error handling** for all operations
5. Test all functionality thoroughly before submission

### Submission Requirements
You must submit:
1. **Complete source code** (zipped project folder)
2. **PDF Report** containing:
   - Screenshots of running application with outputs
   - Code snippets with explanations
   - Answers to theoretical questions
   - State management strategy comparison table
3. **File naming convention:** `CSC367_Assignment6_RollNumber_Name.zip`

### Plagiarism Policy
- **Individual assignment** - no group work allowed
- Code copied from internet without understanding will result in **zero marks**
- Proper citation required for any external references used

---

## Questions

### Part A: Theoretical Questions (5 Marks)

**Q1.** Explain why HTTP is a stateless protocol. What challenges does this present for web application development? How does ASP.NET Core address these challenges? **(2 marks)**

**Q2.** Create a comparison table with the following columns: State Management Technique, Storage Location, Lifetime, Size Limit, Security Level, Best Use Case. Fill this table for: Session State, TempData, Cookies, Cache, Hidden Fields, Query Strings. **(3 marks)**

---

### Part B: Programming Questions (15 Marks)

---

#### **Question 1: Shopping Cart using Session State (4 marks)**

**Syllabus Topic:** 6.2 - Session State

**Problem Statement:**  
Create a simple shopping cart application that uses **Session State** to maintain user's cart items across multiple page requests.

**Requirements:**

1. **Product Model** (`Models/Product.cs`):
   ```csharp
   public class Product
   {
       public int ProductId { get; set; }
       public string Name { get; set; }
       public decimal Price { get; set; }
       public string Description { get; set; }
   }
   ```

2. **Cart Item Model** (`Models/CartItem.cs`):
   ```csharp
   public class CartItem
   {
       public Product Product { get; set; }
       public int Quantity { get; set; }
       public decimal TotalPrice => Product.Price * Quantity;
   }
   ```

3. **Implement the following functionality:**
   - **Products Page**: Display list of at least 5 products with "Add to Cart" button
   - **Add to Cart**: Store cart items in Session (use `List<CartItem>`)
   - **View Cart**: Display all items in cart with quantity and total price
   - **Update Quantity**: Allow users to change quantity of items in cart
   - **Remove Item**: Remove specific item from cart
   - **Clear Cart**: Remove all items from session
   - **Calculate Total**: Display total amount for all items

4. **Session Configuration** (`Program.cs` or `Startup.cs`):
   ```csharp
   // Configure session services
   builder.Services.AddSession(options =>
   {
       options.IdleTimeout = TimeSpan.FromMinutes(30);
       options.Cookie.HttpOnly = true;
       options.Cookie.IsEssential = true;
   });
   
   // Use session middleware
   app.UseSession();
   ```

**Expected Features:**
- Session should persist cart items across page refreshes
- Session should expire after 30 minutes of inactivity
- Display session expiration warning to user
- Handle session loss gracefully

**Testing Scenarios:**
1. Add multiple products to cart and verify persistence across pages
2. Update quantity and verify total price calculation
3. Remove items and verify cart updates
4. Clear entire cart and verify empty state
5. Open in new browser tab/window (different session) and verify separate cart

**Deliverables:**
- `ProductController.cs` with actions: Index, AddToCart, ViewCart, UpdateQuantity, RemoveFromCart, ClearCart
- Razor views for displaying products and cart
- Screenshots showing cart operations

---

#### **Question 2: Notification System using TempData (3 marks)**

**Syllabus Topic:** 6.2 - TempData

**Problem Statement:**  
Implement a feedback/notification system using **TempData** to display success, error, warning, and info messages after form submissions or operations.

**Requirements:**

1. **Create a User Registration Form** with fields:
   - Username (required, 3-20 characters)
   - Email (required, valid email format)
   - Password (required, minimum 6 characters)
   - Confirm Password (must match password)

2. **Implement TempData for notifications:**
   ```csharp
   // Success message
   TempData["SuccessMessage"] = "User registered successfully!";
   
   // Error message
   TempData["ErrorMessage"] = "Registration failed. Please try again.";
   
   // Warning message
   TempData["WarningMessage"] = "Username already exists!";
   
   // Info message
   TempData["InfoMessage"] = "Please verify your email address.";
   ```

3. **Create a Layout or ViewComponent** to display TempData messages:
   - Use Bootstrap alerts (success, danger, warning, info)
   - Auto-dismiss after 5 seconds using JavaScript
   - Display icon for each message type

4. **Implement scenarios that trigger different messages:**
   - Successful registration → Success message
   - Validation errors → Error message
   - Duplicate username → Warning message
   - After registration → Info message about email verification

5. **Demonstrate TempData behavior:**
   - Show that TempData persists only for one subsequent request
   - Use `TempData.Keep()` to preserve data for additional request
   - Use `TempData.Peek()` to read without removing

**Expected Features:**
- TempData should display only once (consumed after display)
- Multiple message types should be supported
- Messages should be styled appropriately
- Handle multiple messages in queue

**Testing Scenarios:**
1. Submit valid form and verify success message appears
2. Refresh page and verify message disappears
3. Submit invalid form and verify error message
4. Trigger multiple operations and verify message queue

**Deliverables:**
- `AccountController.cs` with Register action (GET and POST)
- Registration view with form and validation
- Shared partial view for displaying TempData messages
- Screenshots of different message types

---

#### **Question 3: User Preferences using Cookies (3 marks)**

**Syllabus Topic:** 6.3 - Cookies (Client-side strategy)

**Problem Statement:**  
Create a user preference system using **Cookies** to remember user settings like theme (light/dark), language, and items per page.

**Requirements:**

1. **Preference Settings:**
   - Theme: Light, Dark, Auto
   - Language: English, Nepali, Hindi
   - Items Per Page: 10, 25, 50, 100

2. **Implement Cookie Operations:**
   
   **Setting Cookies:**
   ```csharp
   public IActionResult SetPreference(string theme, string language, int itemsPerPage)
   {
       // Create cookie options
       var cookieOptions = new CookieOptions
       {
           Expires = DateTime.Now.AddDays(30),
           HttpOnly = true,
           Secure = true,
           SameSite = SameSiteMode.Strict
       };
       
       // Set cookies
       Response.Cookies.Append("UserTheme", theme, cookieOptions);
       Response.Cookies.Append("UserLanguage", language, cookieOptions);
       Response.Cookies.Append("ItemsPerPage", itemsPerPage.ToString(), cookieOptions);
       
       return RedirectToAction("Index");
   }
   ```
   
   **Reading Cookies:**
   ```csharp
   public IActionResult Index()
   {
       // Read cookies with default values
       string theme = Request.Cookies["UserTheme"] ?? "Light";
       string language = Request.Cookies["UserLanguage"] ?? "English";
       int itemsPerPage = int.Parse(Request.Cookies["ItemsPerPage"] ?? "10");
       
       ViewBag.Theme = theme;
       ViewBag.Language = language;
       ViewBag.ItemsPerPage = itemsPerPage;
       
       return View();
   }
   ```

3. **Create UI for Preferences:**
   - Settings page with dropdown/radio buttons for preferences
   - "Save Preferences" button
   - "Reset to Default" button (delete cookies)
   - Display current preferences on all pages

4. **Apply Theme Dynamically:**
   - Load different CSS file based on theme cookie
   - Change background colors and text colors
   - Persist theme across all pages

5. **Delete Cookies:**
   ```csharp
   public IActionResult ResetPreferences()
   {
       Response.Cookies.Delete("UserTheme");
       Response.Cookies.Delete("UserLanguage");
       Response.Cookies.Delete("ItemsPerPage");
       
       TempData["InfoMessage"] = "Preferences reset to default.";
       return RedirectToAction("Index");
   }
   ```

**Expected Features:**
- Cookies should persist for 30 days
- Preferences should apply immediately after saving
- Theme changes should be visible across all pages
- Secure cookies (HttpOnly, Secure flags set)

**Testing Scenarios:**
1. Set preferences and verify they persist after closing browser
2. Change theme and verify CSS changes
3. Reset preferences and verify default values
4. Check cookies in browser developer tools
5. Verify cookie expiration (check expires date)

**Deliverables:**
- `PreferencesController.cs` with actions for setting and reading cookies
- Settings view with preference form
- Light and Dark theme CSS files
- Screenshots showing different themes and cookie values in browser

---

#### **Question 4: Search Filters using Query Strings (2 marks)**

**Syllabus Topic:** 6.3 - Query Strings (Client-side strategy)

**Problem Statement:**  
Implement a product search/filter page that uses **Query Strings** to maintain filter selections when sharing URLs or bookmarking pages.

**Requirements:**

1. **Product List with Filters:**
   - Category filter (Electronics, Clothing, Books, All)
   - Price range filter (0-1000, 1000-5000, 5000-10000, 10000+)
   - Sort by (Name A-Z, Name Z-A, Price Low-High, Price High-Low)
   - Search keyword input

2. **Implement Query String Filtering:**
   ```csharp
   public IActionResult SearchProducts(string category, string priceRange, 
                                       string sortBy, string keyword)
   {
       // Get all products (from database or static list)
       var products = GetAllProducts();
       
       // Filter by category
       if (!string.IsNullOrEmpty(category) && category != "All")
       {
           products = products.Where(p => p.Category == category).ToList();
       }
       
       // Filter by price range
       if (!string.IsNullOrEmpty(priceRange))
       {
           products = FilterByPriceRange(products, priceRange);
       }
       
       // Search by keyword
       if (!string.IsNullOrEmpty(keyword))
       {
           products = products.Where(p => p.Name.Contains(keyword, 
                                     StringComparison.OrdinalIgnoreCase)).ToList();
       }
       
       // Sort products
       products = SortProducts(products, sortBy);
       
       // Pass filter values back to view for maintaining selection
       ViewBag.Category = category;
       ViewBag.PriceRange = priceRange;
       ViewBag.SortBy = sortBy;
       ViewBag.Keyword = keyword;
       
       return View(products);
   }
   ```

3. **Build Query String URLs:**
   ```html
   @* In Razor View *@
   <form asp-action="SearchProducts" method="get">
       <select name="category">
           <option value="All" selected="@(ViewBag.Category == "All")">All Categories</option>
           <option value="Electronics" selected="@(ViewBag.Category == "Electronics")">Electronics</option>
           <!-- More options -->
       </select>
       
       <input type="text" name="keyword" value="@ViewBag.Keyword" placeholder="Search..." />
       
       <button type="submit">Search</button>
   </form>
   
   @* URL will be: /Products/SearchProducts?category=Electronics&priceRange=1000-5000&sortBy=PriceAsc&keyword=laptop *@
   ```

4. **Features:**
   - Maintain selected filter values in form controls
   - Display applied filters as "tags" with remove option
   - "Clear All Filters" button
   - Display result count
   - Shareable URLs (copy URL and paste in new tab should show same results)

**Expected Features:**
- Query strings should be clearly visible in URL
- All filter values should persist in form after submission
- URL should be bookmarkable and shareable
- Removing a filter should update URL

**Testing Scenarios:**
1. Apply multiple filters and verify results
2. Copy URL and open in new tab - verify same results
3. Use browser back button - verify filters maintained
4. Share URL with another user and verify same view

**Deliverables:**
- `ProductController.cs` with search functionality
- Search view with filter form
- At least 20 sample products in different categories
- Screenshots showing filtered results and URLs

---

#### **Question 5: Application Cache Implementation (3 marks)**

**Syllabus Topic:** 6.2 - Cache (Server-side strategy)

**Problem Statement:**  
Implement **Memory Cache** to improve performance of frequently accessed data like product categories, featured products, or configuration settings.

**Requirements:**

1. **Configure Memory Cache:**
   ```csharp
   // In Program.cs or Startup.cs
   builder.Services.AddMemoryCache();
   ```

2. **Create a Caching Service:**
   ```csharp
   public interface ICacheService
   {
       T Get<T>(string key);
       void Set<T>(string key, T value, TimeSpan expiration);
       void Remove(string key);
       bool Exists(string key);
   }
   
   public class CacheService : ICacheService
   {
       private readonly IMemoryCache _cache;
       
       public CacheService(IMemoryCache cache)
       {
           _cache = cache;
       }
       
       public T Get<T>(string key)
       {
           return _cache.TryGetValue(key, out T value) ? value : default;
       }
       
       public void Set<T>(string key, T value, TimeSpan expiration)
       {
           var cacheOptions = new MemoryCacheEntryOptions
           {
               AbsoluteExpirationRelativeToNow = expiration,
               Priority = CacheItemPriority.Normal
           };
           
           _cache.Set(key, value, cacheOptions);
       }
       
       public void Remove(string key)
       {
           _cache.Remove(key);
       }
       
       public bool Exists(string key)
       {
           return _cache.TryGetValue(key, out _);
       }
   }
   ```

3. **Implement Cached Operations:**

   **Cache Product Categories:**
   ```csharp
   public List<Category> GetCategories()
   {
       string cacheKey = "ProductCategories";
       
       // Try to get from cache
       var categories = _cacheService.Get<List<Category>>(cacheKey);
       
       if (categories == null)
       {
           // Not in cache, fetch from database
           categories = _dbContext.Categories.ToList();
           
           // Store in cache for 1 hour
           _cacheService.Set(cacheKey, categories, TimeSpan.FromHours(1));
           
           ViewBag.CacheStatus = "Data loaded from database";
       }
       else
       {
           ViewBag.CacheStatus = "Data loaded from cache (faster!)";
       }
       
       return categories;
   }
   ```

4. **Implement Cache Scenarios:**
   - **Featured Products**: Cache top 10 products for 30 minutes
   - **Configuration Settings**: Cache app settings for 24 hours
   - **User Stats**: Cache user statistics for 5 minutes
   - **Cache Invalidation**: Clear specific cache when data is updated

5. **Create Cache Management Page:**
   - Display all cached items with keys and expiration times
   - "Clear Cache" button for each item
   - "Clear All Cache" button
   - Show cache hit/miss statistics

6. **Demonstrate Performance Improvement:**
   - Add timestamp to track data loading time
   - Compare first request (cache miss) vs subsequent requests (cache hit)
   - Use `System.Diagnostics.Stopwatch` to measure execution time

**Expected Features:**
- Cache should expire after specified time
- Cache should be cleared when data is modified
- Display visual indicator (cached vs fresh data)
- Show performance metrics

**Testing Scenarios:**
1. First load - verify data comes from database (slower)
2. Subsequent loads - verify data comes from cache (faster)
3. Wait for expiration - verify cache refresh
4. Update data - verify cache invalidation
5. Restart application - verify cache is cleared

**Deliverables:**
- `CacheService.cs` implementation
- Controller using cache service
- Views showing cached data with timestamps
- Cache management admin page
- Screenshots showing performance difference
- Performance metrics report

---

## Evaluation Rubric

### Part A: Theoretical Questions (5 marks)

| Criteria | Excellent (4-5) | Good (3) | Average (2) | Poor (0-1) |
|----------|----------------|----------|-------------|------------|
| **Q1: HTTP Stateless** | Complete explanation with examples | Good explanation | Basic understanding | Incomplete/Incorrect |
| **Q2: Comparison Table** | All 6 techniques compared correctly | 4-5 techniques correct | 2-3 techniques correct | Less than 2 correct |

### Part B: Programming Questions (15 marks)

**Question 1: Shopping Cart - Session State (4 marks)**

| Criteria | Marks | Description |
|----------|-------|-------------|
| Session Configuration | 0.5 | Proper session setup in Program.cs/Startup.cs |
| Add to Cart | 1.0 | Correct session storage of cart items |
| View/Update Cart | 1.0 | Display and modify cart functionality |
| Remove/Clear | 0.5 | Remove items and clear cart working |
| Session Handling | 0.5 | Proper session timeout and error handling |
| UI/UX | 0.5 | Clean interface with good user experience |

**Question 2: Notification - TempData (3 marks)**

| Criteria | Marks | Description |
|----------|-------|-------------|
| TempData Implementation | 1.0 | Correct use of TempData for messages |
| Multiple Message Types | 0.5 | Success, error, warning, info messages |
| Display Component | 0.5 | Shared view/component for notifications |
| TempData Behavior | 0.5 | Demonstrates Peek(), Keep(), one-time display |
| Styling | 0.5 | Bootstrap alerts with auto-dismiss |

**Question 3: User Preferences - Cookies (3 marks)**

| Criteria | Marks | Description |
|----------|-------|-------------|
| Cookie Operations | 1.0 | Set, read, delete cookies correctly |
| Cookie Options | 0.5 | Proper security settings (HttpOnly, Secure) |
| Theme Implementation | 1.0 | Dynamic theme switching with CSS |
| Settings UI | 0.5 | Settings page with save/reset functionality |

**Question 4: Search Filters - Query Strings (2 marks)**

| Criteria | Marks | Description |
|----------|-------|-------------|
| Query String Handling | 1.0 | Correct filtering using query parameters |
| Filter Persistence | 0.5 | Selected filters maintained in form |
| URL Generation | 0.25 | Clean, readable URLs |
| Clear Filters | 0.25 | Reset functionality working |

**Question 5: Cache Implementation (3 marks)**

| Criteria | Marks | Description |
|----------|-------|-------------|
| Cache Service | 1.0 | Complete ICacheService implementation |
| Cache Usage | 1.0 | Proper cache get/set with expiration |
| Cache Management | 0.5 | Admin page for cache operations |
| Performance Metrics | 0.5 | Demonstrates performance improvement |

### General Code Quality (Applies to all questions)

**Deductions:**
- Poor code organization: -0.5
- Missing comments: -0.5
- No error handling: -0.5
- Hardcoded values (not configurable): -0.5
- Not following naming conventions: -0.5
- Missing validation: -0.5
- Poor UI/UX: -0.5

---

## Submission Checklist

Before submitting, ensure you have:

- ☐ **Complete Visual Studio solution** with all projects building successfully
- ☐ **All 5 questions implemented** with working functionality
- ☐ **PDF Report** containing:
  - ☐ Cover page with name, roll number, course details
  - ☐ Answers to theoretical questions (Part A)
  - ☐ Screenshots of each question's output
  - ☐ Code snippets with explanations
  - ☐ State management comparison table
  - ☐ Conclusion about which technique to use when
- ☐ **Proper file naming**: `CSC367_Assignment6_[RollNo]_[Name].zip`
- ☐ **README.txt file** with:
  - ☐ Instructions to run the project
  - ☐ .NET Core version used
  - ☐ Database setup instructions (if applicable)
  - ☐ Any special configurations needed

---

## Tips for Success

1. **Start Early**: Don't wait until the last moment
2. **Test Thoroughly**: Test each feature in different browsers
3. **Security First**: Always validate input and use secure cookie options
4. **Clean Code**: Write readable code with proper comments
5. **User Experience**: Make UI intuitive and user-friendly
6. **Error Handling**: Handle exceptions gracefully with user-friendly messages
7. **Documentation**: Document your code and design decisions
8. **Performance**: Use appropriate state management for each scenario
9. **Ask Questions**: If stuck, ask during lab sessions or office hours
10. **Backup**: Keep regular backups of your work

---

## Common Mistakes to Avoid

❌ **Don't:**
- Store large objects in cookies (use session instead)
- Store sensitive data in query strings or cookies without encryption
- Use session for data that should persist across browser sessions
- Forget to configure session middleware
- Hardcode timeout values (use configuration)
- Ignore cookie security options (HttpOnly, Secure)
- Cache data that changes frequently
- Store user-specific data in application cache

✅ **Do:**
- Choose the right state management technique for each scenario
- Use server-side state for sensitive data
- Implement proper security measures
- Test edge cases (session timeout, cache expiration, etc.)
- Provide clear feedback to users
- Write clean, maintainable code
- Document why you chose specific techniques

---

## Frequently Asked Questions (FAQ)

**Q1: Can I use a database for this assignment?**  
A: Not required. You can use in-memory collections (List<T>). However, if you want to demonstrate cache with database, you may use Entity Framework Core with SQLite or SQL Server.

**Q2: What .NET version should I use?**  
A: Use .NET Core 3.1 or higher (recommended: .NET 6 or .NET 8).

**Q3: Can I combine multiple state management techniques in one feature?**  
A: Yes! For example, use Session for cart and Cookies for theme - this shows understanding.

**Q4: How should I handle session timeout?**  
A: Display appropriate message to user when session expires and redirect to appropriate page.

**Q5: Should I implement authentication for this assignment?**  
A: Not required unless you want to store user-specific data.

**Q6: Can I use external libraries for styling?**  
A: Yes, you can use Bootstrap, jQuery, or other common libraries.

---

## Learning Resources

**Syllabus Textbook References:**
- T2: ASP.NET Core in Action, Andrew Lock - Chapter 14 (State Management)
- T4: Learn ASP.NET Core 3, Second Edition - Chapter 8

**Microsoft Documentation:**
- Session and state management: https://docs.microsoft.com/en-us/aspnet/core/fundamentals/app-state
- Caching in ASP.NET Core: https://docs.microsoft.com/en-us/aspnet/core/performance/caching/memory
- Cookies: https://docs.microsoft.com/en-us/aspnet/core/security/samesite

**Additional References:**
- ASP.NET Core State Management Best Practices
- Performance optimization using caching
- Security considerations for state management

---

## Late Submission Policy

- **On time (Week 18):** Full marks
- **1-3 days late:** 10% deduction
- **4-7 days late:** 25% deduction
- **More than 7 days late:** Not accepted (0 marks)

**Valid reasons for extension** (with proof):
- Medical emergency
- Family emergency
- University-sanctioned activities

---

## Academic Integrity Statement

By submitting this assignment, you confirm that:
- This is your original work
- You have not copied code without understanding
- Any external resources used are properly cited
- You understand that plagiarism results in zero marks and disciplinary action

---

**Assignment Prepared by:** Senior Professor, Computer Science Department  
**Course:** CSC367 - NET Centric Computing  
**Syllabus Unit:** Unit 6 - State Management on ASP.NET Core Application  
**Course Learning Outcome:** CLO5  
**Semester:** VI  
**Academic Year:** 2024-2025

---

## Contact Information

**For queries contact:**
- During lab sessions (Week 17-18)
- Office hours: [Time and location]
- Email: [Professor email]

**Submission:**
- Submit on: [University LMS/Portal]
- Or: Physical submission in department office

---

**Good Luck! 🎓💻**

Remember: The goal is not just to complete the assignment, but to **understand state management concepts** that are crucial for building real-world web applications. Take time to experiment with different techniques and learn when to use each one.
