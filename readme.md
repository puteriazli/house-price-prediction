![Cuplikan layar_13-1-2026_0101_localhost](https://github.com/user-attachments/assets/5353ba4b-b478-4a98-a5ef-00a3d29d530b)# 🏠 House Price Prediction Web App (Indonesia)

This project is a simple **house price prediction system** built with **Machine Learning + Web Application**. The main goal is to help users estimate a fair house selling price based on location and basic property features.

I built this project as a **junior-level portfolio**, but with a mindset close to real industry use cases: data-driven decisions, clear business insight, and user-friendly implementation.

## Demo
A short video demonstration of the system can be found here:  
👉 **YouTube Demo:** https://www.youtube.com/watch?v=GWEWhdihsRo

---

## 🔍 Problem Background

In the property market, price estimation is often:
- Based on gut feeling or comparison with nearby listings
- Not consistent between agents or platforms
- Hard for normal users to validate

This creates risk for:
- **Sellers**: pricing too low or too high
- **Buyers**: paying above market value
- **Agents / platforms**: losing trust

This project tries to solve that by using historical data and machine learning to give **objective price estimation**.

---

## 💡 Business Insight

From a business perspective, this system can be useful for:

- **Property platforms** → price recommendation feature
- **Real estate agents** → faster and more consistent pricing
- **Individual sellers** → realistic expectation before selling

Key value:
- Reduce manual estimation time
- Improve pricing consistency
- Support decision-making with data

This model is **not meant to replace human judgment**, but to **support it with data**.

---

## ⚙️ Features

- House price prediction using Machine Learning
- Location-based input (Island → Province → City)
- Simple and clean web interface
- Real-time prediction result
- Backend API using Flask
- Frontend using React + Tailwind CSS

---

## 🧠 Machine Learning Overview

- Problem type: **Regression**
- Target: House selling price
- Input features:
  - Location (Island, Province, City)
  - Land area
  - Building area
  - Number of bedrooms
  - Number of bathrooms
  - Parking capacity

The model was trained using historical property data and evaluated using standard regression metrics.

Main focus:
- Stable prediction
- Reasonable error
- Easy to explain result

---

## 🖥️ Tech Stack

**Backend**
- Python
- Flask (REST API)
- Scikit-learn / Random Forest

**Frontend**
- React (Vite)
- Tailwind CSS

**Data & Analysis**
- Pandas
- NumPy
- Matplotlib / Seaborn

---

## 📂 Project Structure (Simplified)

```
project-root/
D:.
│   readme.md
│
├───dataset
│   ├───preprocessing
│   │       yogyakarta_clean.csv
│   │
│   └───raw
│           yogyakarta.csv
│
├───house-price-prediction-website
│   │   readme.md
│   │   readme.txt
│   │
│   ├───backend
│   │   │   app.py
│   │   │   requirements.txt
│   │   │
│   │   └───models
│   │           yogyakarta_model.pkl
│   │
│   └───frontend
│       │   .gitignore
│       │   eslint.config.js
│       │   index.html
│       │   package-lock.json
│       │   package.json
│       │   postcss.config.js
│       │   README.md
│       │   tailwind.config.js
│       │   vite.config.js
│       │
│       ├───public
│       │       vite.svg
│       │
│       └───src
│           │   App.css
│           │   App.jsx
│           │   index.css
│           │   main.jsx
│           │
│           ├───assets
│           │       react.svg
│           │
│           └───data
│                   lokasi.js
│                   lokasi.json
│
└───model
        data-preparation.ipynb
        house-prediction-model.ipynb
```

---

## 🚀 How to Run

### Backend

```bash
pip install -r requirements.txt
python app.py
```

Backend will run on:
```
http://127.0.0.1:5000
```

### Frontend

```bash
npm install
npm run dev
```

---

## 📊 Example Use Case

1. User selects location (Island, Province, City)
2. User inputs house details
3. System predicts estimated selling price
4. User uses result as reference for pricing decision

---

## ⚠️ Limitations

- Prediction accuracy depends on data quality
- Location granularity is still limited
- Market trends can change over time

This project is **a learning and portfolio project**, not a production-ready pricing engine.

---

## 🎯 What This Project Shows

- Understanding of end-to-end ML workflow
- Ability to connect ML model with web application
- Basic business thinking, not only technical
- Clean and structured implementation

As a fresh graduate, my focus is building **clear, understandable, and useful systems**, while continuously improving model quality and engineering practices.

---

## 📌 Future Improvements

- Add time-based market trends
- Improve location granularity
- Model explainability (feature importance / SHAP)
- User authentication and history

---

## 🖥️ Web Application Screenshots

### Home Page
![Cuplikan layar_13-1-2026_0101_localhost](https://github.com/user-attachments/assets/7981fb96-7ecf-49eb-b75e-f132fe583ad3)

### Predict Result Page
![Cuplikan layar_13-1-2026_0193_localhost](https://github.com/user-attachments/assets/892d9d21-8fa0-48fd-8355-bad90cd00b20)

### Button Menu Page
<img width="960" height="564" alt="Screenshot 2026-01-13 001527" src="https://github.com/user-attachments/assets/e33c33f2-a218-4a9a-85ff-714f15c1aa91" />

<img width="960" height="564" alt="Screenshot 2026-01-13 001153" src="https://github.com/user-attachments/assets/5278cc3a-b12f-4e24-a0b3-e6d7b5462d63" />

<img width="960" height="564" alt="Screenshot 2026-01-13 001203" src="https://github.com/user-attachments/assets/8cd532cd-7ec5-42be-87ee-1da802d9a081" />

---

## 👤 Author

Built by Puteri Amelia Azli with strong interest in:
- Data Science
- Machine Learning
- Backend & Frontend Integration

This project represents my readiness to work in a **real team environment**, learn fast, and build data-driven products.

