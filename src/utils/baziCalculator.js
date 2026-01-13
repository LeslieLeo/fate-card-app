import {
  Gan,
  Zhi,
  ShX,
  zhi5,
  zhi5_list,
  ten_deities,
  ganzhi60,
  nayins,
  empties,
  shengxiaos,
  zhi_atts
} from './baziData.js';

function getGanZhiIndex(gan, zhi) {
  const ganIndex = Gan.indexOf(gan);
  const zhiIndex = Zhi.indexOf(zhi);
  return { ganIndex, zhiIndex };
}

function getNayin(gan, zhi) {
  const ganzhi = gan + zhi;
  return nayins[ganzhi] || "";
}

function getEmpty(gan, zhi) {
  const ganzhi = gan + zhi;
  const emptyZhis = empties[ganzhi] || [];
  return emptyZhis;
}

function getShengxiao(zhi) {
  return shengxiaos[zhi] || "";
}

function getZhiDetail(zhi, me) {
  const result = [];
  const zhiData = zhi5[zhi] || {};
  for (const gan in zhiData) {
    const strength = zhiData[gan];
    const wuxing = getWuxing(gan);
    const deity = ten_deities[me] ? ten_deities[me][gan] : "";
    result.push(`${gan}${wuxing}${strength}${deity}`);
  }
  return result.join(" ");
}

function getWuxing(gan) {
  const wuxingMap = {
    "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土", "己": "土",
    "庚": "金", "辛": "金", "壬": "水", "癸": "水"
  };
  return wuxingMap[gan] || "";
}

function checkGan(gan, gans) {
  let result = '';
  const deity = ten_deities[gan];
  if (deity && deity['合'] && gans.includes(deity['合'])) {
    result += "合" + deity['合'];
  }
  if (deity && deity['冲'] && gans.includes(deity['冲'])) {
    result += "冲" + deity['冲'];
  }
  return result;
}

function getGen(gan, zhis) {
  const zhus = [];
  const zhongs = [];
  const weis = [];
  let result = "";
  
  for (const item of zhis) {
    const zhu = zhi5_list[item][0];
    if (ten_deities[gan] && ten_deities[gan]['本'] === ten_deities[zhu]['本']) {
      zhus.push(item);
    }
  }

  for (const item of zhis) {
    if (zhi5_list[item].length < 2) continue;
    const zhong = zhi5_list[item][1];
    if (ten_deities[gan] && ten_deities[gan]['本'] === ten_deities[zhong]['本']) {
      zhongs.push(item);
    }
  }

  for (const item of zhis) {
    if (zhi5_list[item].length < 3) continue;
    const wei = zhi5_list[item][2];
    if (ten_deities[gan] && ten_deities[gan]['本'] === ten_deities[wei]['本']) {
      weis.push(item);
    }
  }

  if (!zhus.length && !zhongs.length && !weis.length) {
    return "无根";
  } else {
    if (zhus.length) result += "强：" + zhus.join("") + " ";
    if (zhongs.length) result += "中：" + zhongs.join("") + " ";
    if (weis.length) result += "弱：" + weis.join("");
    return result;
  }
}

function calculateBazi(year, month, day, hour) {
  const ganzhi = getGanZhiFromSolar(year, month, day, hour);
  
  const result = {
    year: ganzhi.year,
    month: ganzhi.month,
    day: ganzhi.day,
    hour: ganzhi.hour,
    shengxiao: getShengxiao(ganzhi.year[1]),
    nayin: {
      year: getNayin(ganzhi.year[0], ganzhi.year[1]),
      month: getNayin(ganzhi.month[0], ganzhi.month[1]),
      day: getNayin(ganzhi.day[0], ganzhi.day[1]),
      hour: getNayin(ganzhi.hour[0], ganzhi.hour[1])
    },
    empty: getEmpty(ganzhi.day[0], ganzhi.day[1]),
    gen: getGen(ganzhi.day[0], [ganzhi.year[1], ganzhi.month[1], ganzhi.day[1], ganzhi.hour[1]]),
    zhiDetails: {
      year: getZhiDetail(ganzhi.year[1], ganzhi.day[0]),
      month: getZhiDetail(ganzhi.month[1], ganzhi.day[0]),
      day: getZhiDetail(ganzhi.day[1], ganzhi.day[0]),
      hour: getZhiDetail(ganzhi.hour[1], ganzhi.day[0])
    },
    ganRelations: {
      year: checkGan(ganzhi.year[0], [ganzhi.month[0], ganzhi.day[0], ganzhi.hour[0]]),
      month: checkGan(ganzhi.month[0], [ganzhi.year[0], ganzhi.day[0], ganzhi.hour[0]]),
      day: checkGan(ganzhi.day[0], [ganzhi.year[0], ganzhi.month[0], ganzhi.hour[0]]),
      hour: checkGan(ganzhi.hour[0], [ganzhi.year[0], ganzhi.month[0], ganzhi.day[0]])
    }
  };

  return result;
}

function getGanZhiFromSolar(year, month, day, hour) {
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const daysDiff = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
  
  const ganzhiIndex = (daysDiff + 6) % 60;
  const dayGanZhi = ganzhi60[ganzhiIndex];
  
  const yearGanZhi = getYearGanZhi(year);
  const monthGanZhi = getMonthGanZhi(yearGanZhi, month);
  const hourGanZhi = getHourGanZhi(dayGanZhi, hour);
  
  return {
    year: yearGanZhi,
    month: monthGanZhi,
    day: dayGanZhi,
    hour: hourGanZhi
  };
}

function getYearGanZhi(year) {
  const ganIndex = (year - 4) % 10;
  const zhiIndex = (year - 4) % 12;
  return Gan[ganIndex] + Zhi[zhiIndex];
}

function getMonthGanZhi(yearGanZhi, month) {
  const yearGan = yearGanZhi[0];
  const yearGanIndex = Gan.indexOf(yearGan);
  
  const monthGanIndex = (yearGanIndex * 2 + month) % 10;
  const monthZhiIndex = (month + 1) % 12;
  
  return Gan[monthGanIndex] + Zhi[monthZhiIndex];
}

function getHourGanZhi(dayGanZhi, hour) {
  const dayGan = dayGanZhi[0];
  const dayGanIndex = Gan.indexOf(dayGan);
  
  const hourZhiIndex = Math.floor((hour + 1) / 2) % 12;
  const hourGanIndex = (dayGanIndex * 2 + hourZhiIndex) % 10;
  
  return Gan[hourGanIndex] + Zhi[hourZhiIndex];
}

function getZhiRelations(zhi1, zhi2) {
  const atts1 = zhi_atts[zhi1] || {};
  const atts2 = zhi_atts[zhi2] || {};
  
  const relations = [];
  
  if (atts1.冲 === zhi2) {
    relations.push({ type: "冲", desc: "相冲" });
  }
  if (atts1.合 === zhi2) {
    relations.push({ type: "合", desc: "相合" });
  }
  if (atts1.六合 === zhi2) {
    relations.push({ type: "六合", desc: "六合" });
  }
  if (atts1.三合 && atts1.三合.includes(zhi2)) {
    relations.push({ type: "三合", desc: "三合" });
  }
  if (atts1.三会 && atts1.三会.includes(zhi2)) {
    relations.push({ type: "三会", desc: "三会" });
  }
  if (atts1.刑 && atts1.刑.includes(zhi2)) {
    relations.push({ type: "刑", desc: "相刑" });
  }
  if (atts1.害 && atts1.害.includes(zhi2)) {
    relations.push({ type: "害", desc: "相害" });
  }
  if (atts1.破 && atts1.破.includes(zhi2)) {
    relations.push({ type: "破", desc: "相破" });
  }
  
  return relations;
}

function calculateCompatibility(bazi1, bazi2) {
  const compatibility = {
    score: 0,
    details: []
  };
  
  const zhis1 = [bazi1.year[1], bazi1.month[1], bazi1.day[1], bazi1.hour[1]];
  const zhis2 = [bazi2.year[1], bazi2.month[1], bazi2.day[1], bazi2.hour[1]];
  
  for (let i = 0; i < 4; i++) {
    const relations = getZhiRelations(zhis1[i], zhis2[i]);
    for (const relation of relations) {
      compatibility.details.push({
        position: ["年", "月", "日", "时"][i],
        zhi1: zhis1[i],
        zhi2: zhis2[i],
        ...relation
      });
      
      switch (relation.type) {
        case "六合":
          compatibility.score += 15;
          break;
        case "三合":
          compatibility.score += 10;
          break;
        case "合":
          compatibility.score += 8;
          break;
        case "三会":
          compatibility.score += 5;
          break;
        case "冲":
          compatibility.score -= 15;
          break;
        case "刑":
          compatibility.score -= 10;
          break;
        case "害":
          compatibility.score -= 8;
          break;
        case "破":
          compatibility.score -= 5;
          break;
      }
    }
  }
  
  compatibility.score = Math.max(0, Math.min(100, 50 + compatibility.score));
  
  return compatibility;
}

export {
  calculateBazi,
  calculateCompatibility,
  getZhiRelations,
  getShengxiao,
  getNayin,
  getEmpty,
  getGen,
  getZhiDetail,
  checkGan
};
