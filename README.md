# IVDA G10 - IKEAlytics: An Explainable IKEA Recommender System

## 1. Introduction
IKEAlytics is a personalized recommendation system aimed at **non-expert IKEA shoppers**. THe tool provides **personalized recommendations** with visual and textual explanations to improve user trust and satisfaction. Users can input certain perferences and like items in order to build a preferences profile, based upon which recommendations get generated.

**Key Objectives:**
- Help users explore new IKEA products matchin their preferences
- Explain recommendations through textual and visual components

## 2. Features
- **Input Preferences:** User can mark liked items
- **Generate Recommendations:** Uses a KNN-based algorithm to find similar products
- **Visual Explanation:** Plots illustrate similarity between recommendation and liked items
- **Textaul Explanation:** Detailed reasoning for each recommendation

## 3. Data
IKEA dataset from [Kaggle](https://www.kaggle.com/datasets/ahmedkallam/ikea-sa-furniture-web-scraping/data)

**Feature Engineering:**
- Added "room" featire for filtering
- Hierarchical cluserting to group designers into clusters - reduce dimensionality

## 4. Setup Instructions

1. **Clone the Repository**
```bash
git clone https://github.com/noah18c/IVDA_G10.git
cd IVDA_G10
```
2. **Install Dependencies** -- Backend: 

```
pip install -r requirements.txt
```
3. **Install Dependencies** -- Frontend: 

```
npm install
```
4. **Start Backend**
```
flask run
```
5. **Start Frontend**
```
npm run dev
```

----
This project was developed as part of the **Interactive Visual Data Analysis (IVDA)** course at the *University of Zurich*. 

