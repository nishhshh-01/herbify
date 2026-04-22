// screens/AyurvedicQuizScreen.js
// 🌿 Bonus feature: Interactive Ayurvedic Herb Quiz
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const QUESTIONS = [
  {
    question: "Which herb is known as the 'Queen of Ayurvedic Herbs' and is famous for stress relief?",
    options: ["Turmeric", "Ashwagandha", "Neem", "Giloy"],
    answer: 1,
    fact: "Ashwagandha (Withania somnifera) is an adaptogen that reduces cortisol, the primary stress hormone.",
  },
  {
    question: "Which yellow spice contains Curcumin, a powerful anti-inflammatory compound?",
    options: ["Ginger", "Camphor", "Turmeric", "Shatavari"],
    answer: 2,
    fact: "Turmeric (Haldi) contains curcumin which is 5–8x more anti-inflammatory than ibuprofen in certain studies.",
  },
  {
    question: "Which Ayurvedic herb is called 'Guduchi' and is famous for boosting immunity against dengue fever?",
    options: ["Brahmi", "Giloy", "Arjuna", "Moringa"],
    answer: 1,
    fact: "Giloy (Tinospora cordifolia) is a climbing shrub whose stem is the most medicinally active part.",
  },
  {
    question: "Which herb is called the 'Miracle Tree' and contains 7x the Vitamin C of oranges?",
    options: ["Neem", "Tulsi", "Moringa", "Triphala"],
    answer: 2,
    fact: "Moringa (Sahjan) leaves are a superfood — they contain over 90 nutrients and 46 types of antioxidants.",
  },
  {
    question: "Triphala is a combination of how many fruits?",
    options: ["Two", "Three", "Four", "Five"],
    answer: 1,
    fact: "Triphala = Amalaki + Bibhitaki + Haritaki. It is one of the most ancient Ayurvedic formulas, over 1,000 years old.",
  },
  {
    question: "Which herb is primarily used in Ayurveda for heart health and is known as the 'Arjuna tree'?",
    options: ["Brahmi", "Shatavari", "Arjuna", "Nagkesar"],
    answer: 2,
    fact: "The bark of Arjuna (Terminalia arjuna) strengthens heart muscles and has been used in Ayurveda for 2,500 years.",
  },
  {
    question: "Brahmi is best known for improving which function of the body?",
    options: ["Digestion", "Skin", "Memory & Cognition", "Blood Sugar"],
    answer: 2,
    fact: "Brahmi (Bacopa monnieri) contains Bacosides that repair damaged neurons and improve signal transmission in the brain.",
  },
  {
    question: "Which herb is known as the 'Shatavari' and primarily supports female health?",
    options: ["Aloe Vera", "Shatavari", "Tulsi", "Giloy"],
    answer: 1,
    fact: "Shatavari means 'she who has a hundred husbands' — it nourishes and strengthens the female reproductive system.",
  },
];

export default function AyurvedicQuizScreen({ navigation }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showFact, setShowFact] = useState(false);
  const [finished, setFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const question = QUESTIONS[currentQ];
  const isCorrect = selected === question.answer;

  const handleSelect = (idx) => {
    if (selected !== null) return; // already answered
    setSelected(idx);
    setShowFact(true);
    if (idx === question.answer) {
      setScore((s) => s + 1);
    } else {
      setWrongAnswers((w) => [...w, currentQ]);
    }
  };

  const handleNext = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (currentQ + 1 >= QUESTIONS.length) {
        setFinished(true);
      } else {
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setShowFact(false);
      }
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowFact(false);
    setFinished(false);
    setWrongAnswers([]);
  };

  const getScoreEmoji = () => {
    const pct = (score / QUESTIONS.length) * 100;
    if (pct === 100) return "🏆";
    if (pct >= 75) return "🌿";
    if (pct >= 50) return "🌱";
    return "📚";
  };

  const getScoreMessage = () => {
    const pct = (score / QUESTIONS.length) * 100;
    if (pct === 100) return "Perfect Score! You're an Ayurvedic Master!";
    if (pct >= 75) return "Excellent! You know your herbs well!";
    if (pct >= 50) return "Good effort! Keep exploring the garden.";
    return "Great start! There's much to learn in Ayurveda.";
  };

  if (finished) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#1B5E20" />
          </TouchableOpacity>

          <Text style={styles.resultEmoji}>{getScoreEmoji()}</Text>
          <Text style={styles.resultTitle}>Quiz Complete!</Text>
          <Text style={styles.resultScore}>
            {score} / {QUESTIONS.length}
          </Text>
          <Text style={styles.resultMsg}>{getScoreMessage()}</Text>

          {/* Score bar */}
          <View style={styles.scoreBarTrack}>
            <View
              style={[
                styles.scoreBarFill,
                { width: `${(score / QUESTIONS.length) * 100}%` },
              ]}
            />
          </View>

          {/* Review wrong answers */}
          {wrongAnswers.length > 0 && (
            <View style={styles.reviewBox}>
              <Text style={styles.reviewTitle}>📖 Review These:</Text>
              {wrongAnswers.map((qi) => (
                <View key={qi} style={styles.reviewItem}>
                  <Text style={styles.reviewQ}>{QUESTIONS[qi].question}</Text>
                  <Text style={styles.reviewA}>
                    ✅ {QUESTIONS[qi].options[QUESTIONS[qi].answer]}
                  </Text>
                  <Text style={styles.reviewFact}>💡 {QUESTIONS[qi].fact}</Text>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.restartBtn} onPress={handleRestart} activeOpacity={0.85}>
            <Ionicons name="refresh" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.restartText}>Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => navigation.navigate("Home")}
            activeOpacity={0.85}
          >
            <Ionicons name="home" size={18} color="#2E7D32" style={{ marginRight: 8 }} />
            <Text style={styles.homeBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#1B5E20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🌿 Herb Quiz</Text>
        <Text style={styles.headerScore}>
          {score}/{currentQ}
        </Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${((currentQ) / QUESTIONS.length) * 100}%` },
          ]}
        />
      </View>
      <Text style={styles.progressText}>
        Question {currentQ + 1} of {QUESTIONS.length}
      </Text>

      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <ScrollView contentContainerStyle={styles.quizContent}>

          {/* Question card */}
          <View style={styles.questionCard}>
            <View style={styles.qNumBadge}>
              <Text style={styles.qNumText}>Q{currentQ + 1}</Text>
            </View>
            <Text style={styles.questionText}>{question.question}</Text>
          </View>

          {/* Options */}
          {question.options.map((opt, idx) => {
            let style = styles.optionBtn;
            let textStyle = styles.optionText;
            let icon = null;

            if (selected !== null) {
              if (idx === question.answer) {
                style = [styles.optionBtn, styles.optionCorrect];
                textStyle = [styles.optionText, styles.optionTextCorrect];
                icon = <Ionicons name="checkmark-circle" size={20} color="#2E7D32" style={{ marginRight: 8 }} />;
              } else if (idx === selected && selected !== question.answer) {
                style = [styles.optionBtn, styles.optionWrong];
                textStyle = [styles.optionText, styles.optionTextWrong];
                icon = <Ionicons name="close-circle" size={20} color="#c62828" style={{ marginRight: 8 }} />;
              }
            }

            return (
              <TouchableOpacity
                key={idx}
                style={style}
                onPress={() => handleSelect(idx)}
                activeOpacity={selected !== null ? 1 : 0.75}
              >
                <Text style={styles.optionLetter}>
                  {["A", "B", "C", "D"][idx]}.
                </Text>
                {icon}
                <Text style={textStyle}>{opt}</Text>
              </TouchableOpacity>
            );
          })}

          {/* Fun fact reveal */}
          {showFact && (
            <View style={[styles.factCard, isCorrect ? styles.factCardCorrect : styles.factCardWrong]}>
              <Text style={styles.factTitle}>
                {isCorrect ? "✅ Correct!" : "❌ Not quite!"}
              </Text>
              <Text style={styles.factText}>💡 {question.fact}</Text>
            </View>
          )}

          {/* Next button */}
          {selected !== null && (
            <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.85}>
              <Text style={styles.nextText}>
                {currentQ + 1 < QUESTIONS.length ? "Next Question →" : "See Results 🏆"}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8FFF8" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0F2E0",
    backgroundColor: "#fff",
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: "800", color: "#1B5E20" },
  headerScore: { fontSize: 16, fontWeight: "700", color: "#2E7D32", minWidth: 40, textAlign: "right" },

  progressTrack: { height: 6, backgroundColor: "#E0E0E0" },
  progressFill: { height: "100%", backgroundColor: "#2E7D32" },
  progressText: { fontSize: 12, color: "#666", textAlign: "right", paddingRight: 16, paddingTop: 4, marginBottom: 4 },

  quizContent: { padding: 18, paddingBottom: 40 },

  questionCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  qNumBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 10,
  },
  qNumText: { fontSize: 12, fontWeight: "700", color: "#2E7D32" },
  questionText: { fontSize: 18, fontWeight: "700", color: "#1B5E20", lineHeight: 26 },

  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#A5D6A7",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
  },
  optionCorrect: { borderColor: "#2E7D32", backgroundColor: "#E8F5E9", elevation: 0 },
  optionWrong: { borderColor: "#c62828", backgroundColor: "#FFEBEE", elevation: 0 },
  optionLetter: { fontSize: 15, fontWeight: "800", color: "#2E7D32", width: 28 },
  optionText: { fontSize: 15, color: "#333", flex: 1, lineHeight: 22 },
  optionTextCorrect: { color: "#1B5E20", fontWeight: "700" },
  optionTextWrong: { color: "#c62828", fontWeight: "700" },

  factCard: {
    borderRadius: 14,
    padding: 14,
    marginTop: 10,
    marginBottom: 4,
  },
  factCardCorrect: { backgroundColor: "#E8F5E9", borderLeftWidth: 4, borderLeftColor: "#2E7D32" },
  factCardWrong: { backgroundColor: "#FFF3E0", borderLeftWidth: 4, borderLeftColor: "#FF9800" },
  factTitle: { fontSize: 16, fontWeight: "800", color: "#1B5E20", marginBottom: 6 },
  factText: { fontSize: 14, color: "#444", lineHeight: 21 },

  nextBtn: {
    backgroundColor: "#2E7D32",
    borderRadius: 28,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 16,
    elevation: 4,
    shadowColor: "#2E7D32",
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  // Result screen
  resultContainer: { padding: 24, alignItems: "center", paddingBottom: 40 },
  resultEmoji: { fontSize: 72, marginTop: 10 },
  resultTitle: { fontSize: 28, fontWeight: "800", color: "#1B5E20", marginTop: 12 },
  resultScore: { fontSize: 52, fontWeight: "800", color: "#2E7D32", marginTop: 8 },
  resultMsg: { fontSize: 16, color: "#555", textAlign: "center", marginTop: 8, lineHeight: 24, paddingHorizontal: 20 },
  scoreBarTrack: { width: "80%", height: 10, backgroundColor: "#E0E0E0", borderRadius: 6, marginTop: 20, marginBottom: 24 },
  scoreBarFill: { height: "100%", borderRadius: 6, backgroundColor: "#2E7D32" },
  reviewBox: { width: "100%", backgroundColor: "#fff", borderRadius: 16, padding: 16, elevation: 3, marginBottom: 20 },
  reviewTitle: { fontSize: 17, fontWeight: "700", color: "#1B5E20", marginBottom: 12 },
  reviewItem: { marginBottom: 14, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  reviewQ: { fontSize: 13, color: "#333", fontWeight: "600", lineHeight: 19, marginBottom: 4 },
  reviewA: { fontSize: 13, color: "#2E7D32", fontWeight: "700", marginBottom: 3 },
  reviewFact: { fontSize: 12, color: "#666", lineHeight: 18, fontStyle: "italic" },
  restartBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 28,
    marginBottom: 12,
    elevation: 4,
    width: "100%",
  },
  restartText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  homeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F5E9",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 28,
    width: "100%",
  },
  homeBtnText: { color: "#2E7D32", fontSize: 16, fontWeight: "700" },
});
