const zodiacSigns = [
  { name: "白羊座", symbol: "♈", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19, element: "火", quality: "基本" },
  { name: "金牛座", symbol: "♉", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20, element: "土", quality: "固定" },
  { name: "双子座", symbol: "♊", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20, element: "风", quality: "变动" },
  { name: "巨蟹座", symbol: "♋", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22, element: "水", quality: "基本" },
  { name: "狮子座", symbol: "♌", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22, element: "火", quality: "固定" },
  { name: "处女座", symbol: "♍", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22, element: "土", quality: "变动" },
  { name: "天秤座", symbol: "♎", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22, element: "风", quality: "基本" },
  { name: "天蝎座", symbol: "♏", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21, element: "水", quality: "固定" },
  { name: "射手座", symbol: "♐", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21, element: "火", quality: "变动" },
  { name: "摩羯座", symbol: "♑", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19, element: "土", quality: "基本" },
  { name: "水瓶座", symbol: "♒", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18, element: "风", quality: "固定" },
  { name: "双鱼座", symbol: "♓", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20, element: "水", quality: "变动" }
];

const zodiacCompatibility = {
  "白羊座": {
    "best": ["狮子座", "射手座", "双子座", "水瓶座"],
    "good": ["白羊座", "天秤座"],
    "average": ["巨蟹座", "摩羯座"],
    "poor": ["金牛座", "天蝎座", "处女座", "双鱼座"]
  },
  "金牛座": {
    "best": ["处女座", "摩羯座", "巨蟹座", "双鱼座"],
    "good": ["金牛座", "天蝎座"],
    "average": ["狮子座", "水瓶座"],
    "poor": ["白羊座", "射手座", "双子座", "天秤座"]
  },
  "双子座": {
    "best": ["天秤座", "水瓶座", "白羊座", "狮子座"],
    "good": ["双子座", "射手座"],
    "average": ["处女座", "双鱼座"],
    "poor": ["巨蟹座", "摩羯座", "金牛座", "天蝎座"]
  },
  "巨蟹座": {
    "best": ["天蝎座", "双鱼座", "金牛座", "处女座"],
    "good": ["巨蟹座", "摩羯座"],
    "average": ["白羊座", "天秤座"],
    "poor": ["双子座", "射手座", "狮子座", "水瓶座"]
  },
  "狮子座": {
    "best": ["白羊座", "射手座", "双子座", "天秤座"],
    "good": ["狮子座", "水瓶座"],
    "average": ["金牛座", "天蝎座"],
    "poor": ["巨蟹座", "摩羯座", "处女座", "双鱼座"]
  },
  "处女座": {
    "best": ["金牛座", "摩羯座", "巨蟹座", "天蝎座"],
    "good": ["处女座", "双鱼座"],
    "average": ["双子座", "射手座"],
    "poor": ["白羊座", "狮子座", "天秤座", "水瓶座"]
  },
  "天秤座": {
    "best": ["双子座", "水瓶座", "狮子座", "白羊座"],
    "good": ["天秤座", "白羊座"],
    "average": ["巨蟹座", "摩羯座"],
    "poor": ["金牛座", "天蝎座", "处女座", "双鱼座"]
  },
  "天蝎座": {
    "best": ["巨蟹座", "双鱼座", "金牛座", "处女座"],
    "good": ["天蝎座", "金牛座"],
    "average": ["狮子座", "水瓶座"],
    "poor": ["白羊座", "射手座", "双子座", "天秤座"]
  },
  "射手座": {
    "best": ["白羊座", "狮子座", "双子座", "天秤座"],
    "good": ["射手座", "双子座"],
    "average": ["处女座", "双鱼座"],
    "poor": ["巨蟹座", "摩羯座", "金牛座", "天蝎座"]
  },
  "摩羯座": {
    "best": ["金牛座", "处女座", "巨蟹座", "天蝎座"],
    "good": ["摩羯座", "巨蟹座"],
    "average": ["白羊座", "天秤座"],
    "poor": ["双子座", "射手座", "狮子座", "水瓶座"]
  },
  "水瓶座": {
    "best": ["双子座", "天秤座", "白羊座", "狮子座"],
    "good": ["水瓶座", "狮子座"],
    "average": ["金牛座", "天蝎座"],
    "poor": ["巨蟹座", "摩羯座", "处女座", "双鱼座"]
  },
  "双鱼座": {
    "best": ["巨蟹座", "天蝎座", "金牛座", "处女座"],
    "good": ["双鱼座", "处女座"],
    "average": ["双子座", "射手座"],
    "poor": ["白羊座", "狮子座", "天秤座", "水瓶座"]
  }
};

function getZodiacSign(month, day) {
  for (const sign of zodiacSigns) {
    if ((month === sign.startMonth && day >= sign.startDay) ||
        (month === sign.endMonth && day <= sign.endDay)) {
      return sign;
    }
  }
  return zodiacSigns[11];
}

function getElementCompatibility(element1, element2) {
  const elementRelations = {
    "火": { "火": 80, "土": 60, "风": 70, "水": 50 },
    "土": { "火": 60, "土": 80, "风": 50, "水": 70 },
    "风": { "火": 70, "土": 50, "风": 80, "水": 60 },
    "水": { "火": 50, "土": 70, "风": 60, "水": 80 }
  };
  
  return elementRelations[element1][element2];
}

function getQualityCompatibility(quality1, quality2) {
  const qualityRelations = {
    "基本": { "基本": 70, "固定": 60, "变动": 80 },
    "固定": { "基本": 60, "固定": 70, "变动": 60 },
    "变动": { "基本": 80, "固定": 60, "变动": 70 }
  };
  
  return qualityRelations[quality1][quality2];
}

function calculateZodiacCompatibility(sign1, sign2) {
  const compatibility = zodiacCompatibility[sign1.name];
  
  let score = 50;
  let level = "一般";
  
  if (compatibility.best.includes(sign2.name)) {
    score = 85;
    level = "最佳";
  } else if (compatibility.good.includes(sign2.name)) {
    score = 75;
    level = "良好";
  } else if (compatibility.average.includes(sign2.name)) {
    score = 60;
    level = "一般";
  } else {
    score = 40;
    level = "较差";
  }
  
  const elementScore = getElementCompatibility(sign1.element, sign2.element);
  const qualityScore = getQualityCompatibility(sign1.quality, sign2.quality);
  
  const totalScore = Math.round((score + elementScore + qualityScore) / 3);
  
  return {
    sign1: sign1.name,
    sign2: sign2.name,
    score: totalScore,
    level: level,
    elementScore: elementScore,
    qualityScore: qualityScore,
    details: [
      `${sign1.name} ${sign1.symbol} ↔ ${sign2.name} ${sign2.symbol}`,
      `元素匹配：${sign1.element} ↔ ${sign2.element} (${elementScore}分)`,
      `性质匹配：${sign1.quality} ↔ ${sign2.quality} (${qualityScore}分)`
    ]
  };
}

function calculateAstrologyCompatibility(date1, date2) {
  const sign1 = getZodiacSign(date1.month, date1.day);
  const sign2 = getZodiacSign(date2.month, date2.day);
  
  const zodiacResult = calculateZodiacCompatibility(sign1, sign2);
  
  const loveScore = Math.round(zodiacResult.score * 0.9 + (sign1.element === sign2.element ? 10 : 0));
  const careerScore = Math.round(zodiacResult.score * 0.85 + (sign1.quality !== sign2.quality ? 15 : 0));
  const friendshipScore = Math.round(zodiacResult.score * 0.95 + (sign1.element !== sign2.element ? 5 : 0));
  
  const totalScore = Math.round((loveScore + careerScore + friendshipScore) / 3);
  
  const details = [
    {
      type: "爱情匹配",
      desc: `${sign1.name}与${sign2.name}的爱情匹配度`,
      score: loveScore
    },
    {
      type: "事业合作",
      desc: `${sign1.name}与${sign2.name}的事业合作度`,
      score: careerScore
    },
    {
      type: "友谊指数",
      desc: `${sign1.name}与${sign2.name}的友谊指数`,
      score: friendshipScore
    }
  ];
  
  return {
    sign1: sign1,
    sign2: sign2,
    zodiac: zodiacResult,
    loveScore: loveScore,
    careerScore: careerScore,
    friendshipScore: friendshipScore,
    totalScore: totalScore,
    details: details
  };
}

export {
  zodiacSigns,
  zodiacCompatibility,
  getZodiacSign,
  getElementCompatibility,
  getQualityCompatibility,
  calculateZodiacCompatibility,
  calculateAstrologyCompatibility
};
