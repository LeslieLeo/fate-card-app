import { calculateBazi, calculateCompatibility } from './baziCalculator.js';
import { calculateXingxiuCompatibility } from './xingxiuCalculator.js';
import { calculateAstrologyCompatibility } from './astrologyCalculator.js';

function calculateOverallCompatibility(person1, person2) {
  const bazi1 = calculateBazi(
    person1.birthDate.year,
    person1.birthDate.month,
    person1.birthDate.day,
    person1.birthDate.hour
  );
  
  const bazi2 = calculateBazi(
    person2.birthDate.year,
    person2.birthDate.month,
    person2.birthDate.day,
    person2.birthDate.hour
  );
  
  const baziCompatibility = calculateCompatibility(bazi1, bazi2);
  
  const xingxiuCompatibility = calculateXingxiuCompatibility(
    bazi1,
    bazi2,
    person1.birthDate,
    person2.birthDate
  );
  
  const astrologyCompatibility = calculateAstrologyCompatibility(
    person1.birthDate,
    person2.birthDate
  );
  
  const weights = {
    bazi: 0.4,
    xingxiu: 0.35,
    astrology: 0.25
  };
  
  const overallScore = Math.round(
    baziCompatibility.score * weights.bazi +
    xingxiuCompatibility.totalScore * weights.xingxiu +
    astrologyCompatibility.totalScore * weights.astrology
  );
  
  const dimensions = [
    {
      name: "八字契合度",
      value: baziCompatibility.score,
      max: 100,
      details: baziCompatibility.details
    },
    {
      name: "星宿关系",
      value: xingxiuCompatibility.totalScore,
      max: 100,
      details: [
        {
          type: "本命星宿",
          desc: `${xingxiuCompatibility.benMing.person1.info.name} ↔ ${xingxiuCompatibility.benMing.person2.info.name}：${xingxiuCompatibility.benMing.relation.relation}`,
          score: xingxiuCompatibility.benMing.relation.score
        },
        {
          type: "值日星宿",
          desc: `${xingxiuCompatibility.zhiRi.person1.info.name} ↔ ${xingxiuCompatibility.zhiRi.person2.info.name}：${xingxiuCompatibility.zhiRi.relation.relation}`,
          score: xingxiuCompatibility.zhiRi.relation.score
        }
      ]
    },
    {
      name: "星座匹配",
      value: astrologyCompatibility.totalScore,
      max: 100,
      details: astrologyCompatibility.details
    },
    {
      name: "性格互补",
      value: Math.round((baziCompatibility.score + astrologyCompatibility.totalScore) / 2),
      max: 100,
      details: []
    },
    {
      name: "情感共鸣",
      value: Math.round((xingxiuCompatibility.totalScore + astrologyCompatibility.loveScore) / 2),
      max: 100,
      details: []
    },
    {
      name: "事业合作",
      value: Math.round((baziCompatibility.score + astrologyCompatibility.careerScore) / 2),
      max: 100,
      details: []
    }
  ];
  
  const result = {
    overallScore,
    level: getCompatibilityLevel(overallScore),
    dimensions,
    bazi: {
      person1: bazi1,
      person2: bazi2,
      compatibility: baziCompatibility
    },
    xingxiu: xingxiuCompatibility,
    astrology: astrologyCompatibility,
    summary: generateSummary(overallScore, baziCompatibility, xingxiuCompatibility, astrologyCompatibility),
    advice: generateAdvice(overallScore, baziCompatibility, xingxiuCompatibility, astrologyCompatibility)
  };
  
  return result;
}

function getCompatibilityLevel(score) {
  if (score >= 90) return { level: "天作之合", color: "#ff4757", icon: "❤️" };
  if (score >= 80) return { level: "非常般配", color: "#ff6b81", icon: "💕" };
  if (score >= 70) return { level: "较为合适", color: "#ffa502", icon: "💛" };
  if (score >= 60) return { level: "一般般配", color: "#eccc68", icon: "💚" };
  if (score >= 50) return { level: "需要磨合", color: "#7bed9f", icon: "💙" };
  if (score >= 40) return { level: "不太合适", color: "#70a1ff", icon: "💜" };
  return { level: "需要谨慎", color: "#5352ed", icon: "🖤" };
}

function generateSummary(overallScore, bazi, xingxiu, astrology) {
  const summaries = {
    high: [
      "你们的缘分天注定，八字、星宿、星座三重契合，是天作之合的一对！",
      "前世修来的缘分，今生相遇相知，你们的灵魂高度契合。",
      "命中注定的相遇，你们的结合将带来无尽的幸福与和谐。"
    ],
    medium: [
      "你们的缘分不错，八字和星宿都有相合之处，值得好好珍惜。",
      "虽然不是天作之合，但你们的性格互补，相互理解，可以共同成长。",
      "缘分让你们相遇，用心经营这份感情，未来可期。"
    ],
    low: [
      "你们的缘分一般，需要更多的理解和包容才能走到一起。",
      "性格差异较大，但只要用心经营，也能找到平衡点。",
      "缘分需要努力，如果真心相爱，就勇敢面对挑战吧。"
    ]
  };
  
  let category;
  if (overallScore >= 80) category = "high";
  else if (overallScore >= 60) category = "medium";
  else category = "low";
  
  const categorySummaries = summaries[category];
  const randomIndex = Math.floor(Math.random() * categorySummaries.length);
  
  return categorySummaries[randomIndex];
}

function generateAdvice(overallScore, bazi, xingxiu, astrology) {
  const advices = [];
  
  if (bazi.score >= 70) {
    advices.push("你们的八字相合，性格互补，可以相互成就。");
  } else if (bazi.score >= 50) {
    advices.push("八字方面需要多沟通，理解对方的想法和需求。");
  } else {
    advices.push("八字差异较大，需要更多的包容和耐心。");
  }
  
  if (xingxiu.totalScore >= 70) {
    advices.push("星宿关系良好，前世有缘，今生相遇是命中注定。");
  } else if (xingxiu.totalScore >= 50) {
    advices.push("星宿关系一般，需要用心经营，珍惜这份缘分。");
  } else {
    advices.push("星宿关系较弱，需要更多的努力和理解。");
  }
  
  if (astrology.totalScore >= 70) {
    advices.push("星座匹配度高，价值观和生活方式相似，相处融洽。");
  } else if (astrology.totalScore >= 50) {
    advices.push("星座匹配一般，需要互相适应，找到共同的节奏。");
  } else {
    advices.push("星座差异较大，需要更多的磨合和妥协。");
  }
  
  if (overallScore >= 70) {
    advices.push("总体来说，你们的缘分不错，值得好好珍惜和经营。");
  } else if (overallScore >= 50) {
    advices.push("缘分需要努力，只要用心经营，也能收获幸福。");
  } else {
    advices.push("缘分需要更多的努力，如果真心相爱，就勇敢面对挑战。");
  }
  
  return advices;
}

export {
  calculateOverallCompatibility,
  getCompatibilityLevel,
  generateSummary,
  generateAdvice
};
