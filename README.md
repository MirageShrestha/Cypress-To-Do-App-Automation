# 🧪 Cypress Todo App QA Automation 

- Automation Demo link: https://drive.google.com/file/d/1CtKDgbi5vAVzq9iaiZb6JKOU2Y8UL2mr/view

- Testcases link: https://docs.google.com/spreadsheets/d/1mWeVpFuHHYwJSYqP8dlxhJjHF2LDhh2c/edit?gid=1927106797#gid=1927106797
  
- Mochawesome report link: https://cypress-to-do-app-automation.vercel.app/ 

## 📌 Overview

This project contains end-to-end (E2E) UI automation and API testing for a Todo application using **Cypress**.

The framework is designed with a **modular and scalable structure** using:

- Fixtures (test data & locators)
- Utils (reusable functions)
- Commands (global reusable Cypress actions)
- API utilities
- Session-based login (`cy.session()`)

---

## 🚀 Tech Stack

- Cypress
- JavaScript (ES6)
- Mochawesome (Reporting)
- Node.js

---

## 📂 Project Structure

````
cypress/
  e2e/
    auth/
        login/
        signup/
        setPassword/
        forgotPassword/
    dashboard/
        createList/
        dashnoard/
    api/
      todoCreate.cy.js
      todoUpdate.cy.js
      todoDelete.cy.js

  fixtures/
    loginData.json
    signupData.json...

  support/
    commands.js
    utils/
      loginUtils.js
      signupUtils.js...

---

## 🔐 Session-Based Login

Implemented using `cy.session()` to avoid repeated login.

```javascript
cy.openDashboardWithSession(locators);
````

### Benefits:

- Faster test execution
- Reduced UI dependency
- More stable tests

---

## 🧑‍💻 UI Automation Coverage

### ✅ Modules Covered

- Login
- Signup
- Set Password
- Forgot Password
- Dashboard
- Create List
- Create Task

### ✅ Test Types

- Functional
- Boundary
- Negative
- UI Validation
- Navigation

---

## 🔄 API Automation

### Files:

- `todoCreate.cy.js`
- `todoUpdate.cy.js`
- `todoDelete.cy.js`

### Covered:

- Task CRUD
- List CRUD

### Example:

```javascript
cy.request("POST", tasksUrl, body);
```

---

## 🔍 Intercept Usage (UI + API Validation)

Used to validate API calls triggered by UI.

```javascript
cy.intercept("POST", "**/tasks").as("createTask");
cy.wait("@createTask");
```

### Validations:

- Request payload
- Response status
- Response body

---

## 📊 Reporting (Mochawesome)

### Generate Report:

```
npm run report:merge
npm run report:html
```

### Output:

- Merged JSON
- HTML report

---

## 🧹 Test Data Cleanup

Used after tests to avoid data pollution:

```javascript
after(() => {
  deleteTask(url, id);
});
```

---

## ⚠️ Known Issues / Bugs

- Duplicate list creation allowed
- Password validation issue with special characters (`#`)
- Forgot password email not received
- Dashboard shows incorrect user initials
- UI instability in dropdowns

---

## ▶️ How to Run Tests

### Open Cypress UI

```
npx cypress open
```

### Run all tests

```
npx cypress run
```

### Run API tests only

```
npx cypress run --spec "cypress/e2e/api/"
```

---

## 💡 Key Learnings

- Modular test design improves maintainability
- `cy.session()` optimizes performance
- `cy.intercept()` enables API validation from UI
- API testing improves stability when UI is unreliable
- Fixtures and utils make tests reusable and clean

---

## 🎯 Conclusion

This framework demonstrates a **real-world QA automation approach** combining:

- UI + API testing
- Reusability + scalability
- Performance optimization
- Strong validation strategies

---

## 👨‍💻 Author

Mirage Shrestha
