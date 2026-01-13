import { xingxiuData } from './xingxiuData.js'

const XIU_27 = ['角', '亢', '氐', '房', '心', '尾', '箕', '斗', '牛', '女', '虚', '危', '室', '壁', '奎', '娄', '胃', '昴', '毕', '觜', '参', '井', '鬼', '柳', '星', '张', '翼', '轸']
const XIU_OFFSET = [11, 13, 15, 17, 19, 21, 24, 0, 2, 4, 7, 9]

export function getXiuByDate(year, month, day) {
  const date = new Date(year, month - 1, day)
  const dayOfWeek = date.getDay()
  
  const lunar = getLunarDate(year, month, day)
  const dayZhi = lunar.dayZhi
  
  const xiuKey = `${dayZhi}${dayOfWeek}`
  const xiu = xingxiuData.XIU[xiuKey]
  
  return xiu
}

export function getXiuByMonthDay(month, day) {
  return XIU_27[(XIU_OFFSET[Math.abs(month) - 1] + day - 1) % XIU_27.length]
}

export function getXiuInfo(xiu) {
  return {
    name: xiu,
    luck: xingxiuData.XIU_LUCK[xiu],
    song: xingxiuData.XIU_SONG[xiu],
    zheng: xingxiuData.ZHENG[xiu],
    animal: xingxiuData.ANIMAL[xiu],
    gong: xingxiuData.GONG[xiu]
  }
}

export function getXiuRelation(xiu1, xiu2) {
  const xiuList = ['角', '亢', '氐', '房', '心', '尾', '箕', '斗', '牛', '女', '虚', '危', '室', '壁', '奎', '娄', '胃', '昴', '毕', '觜', '参', '井', '鬼', '柳', '星', '张', '翼', '轸']
  
  const index1 = xiuList.indexOf(xiu1)
  const index2 = xiuList.indexOf(xiu2)
  
  if (index1 === -1 || index2 === -1) {
    return {
      relation: '未知',
      score: 50,
      description: '无法确定关系'
    }
  }
  
  const distance = Math.abs(index1 - index2)
  const maxDistance = xiuList.length - 1
  
  let relation, score, description
  
  if (distance === 0) {
    relation = '命同'
    score = 100
    description = '星宿相同，命格相似，相处融洽'
  } else if (distance === 1 || distance === maxDistance) {
    relation = '命近'
    score = 85
    description = '星宿相近，性格互补，相处和谐'
  } else if (distance === 2 || distance === maxDistance - 1) {
    relation = '命合'
    score = 75
    description = '星宿相合，相互吸引，相处愉快'
  } else if (distance === 3 || distance === maxDistance - 2) {
    relation = '命平'
    score = 65
    description = '星宿平和，相处平淡，需要磨合'
  } else if (distance === 4 || distance === maxDistance - 3) {
    relation = '命远'
    score = 55
    description = '星宿较远，性格差异，需要理解'
  } else if (distance === 5 || distance === maxDistance - 4) {
    relation = '命冲'
    score = 45
    description = '星宿相冲，性格冲突，需要包容'
  } else {
    relation = '命克'
    score = 35
    description = '星宿相克，性格不合，需要谨慎'
  }
  
  return { relation, score, description }
}

export function getBenMingXiu(year, month, day) {
  const xiu = getXiuByDate(year, month, day)
  return getXiuInfo(xiu)
}

export function getZhiRiXiu(year, month, day) {
  const xiu = getXiuByMonthDay(month, day)
  return getXiuInfo(xiu)
}

export function getXiuCompatibility(birth1, birth2) {
  const xiu1 = getXiuByDate(birth1.year, birth1.month, birth1.day)
  const xiu2 = getXiuByDate(birth2.year, birth2.month, birth2.day)
  
  const xiu1Info = getXiuInfo(xiu1)
  const xiu2Info = getXiuInfo(xiu2)
  
  const benMingRelation = getXiuRelation(xiu1, xiu2)
  
  return {
    person1: {
      xiu: xiu1,
      info: xiu1Info
    },
    person2: {
      xiu: xiu2,
      info: xiu2Info
    },
    benMingRelation: benMingRelation,
    overallScore: benMingRelation.score
  }
}

export function calculateXingxiuCompatibility(bazi1, bazi2, birthDate1, birthDate2) {
  const benMingXiu1 = getXiuByDate(birthDate1.year, birthDate1.month, birthDate1.day)
  const benMingXiu2 = getXiuByDate(birthDate2.year, birthDate2.month, birthDate2.day)
  
  const zhiRiXiu1 = getXiuByMonthDay(birthDate1.month, birthDate1.day)
  const zhiRiXiu2 = getXiuByMonthDay(birthDate2.month, birthDate2.day)
  
  const benMingXiu1Info = getXiuInfo(benMingXiu1)
  const benMingXiu2Info = getXiuInfo(benMingXiu2)
  const zhiRiXiu1Info = getXiuInfo(zhiRiXiu1)
  const zhiRiXiu2Info = getXiuInfo(zhiRiXiu2)
  
  const benMingRelation = getXiuRelation(benMingXiu1, benMingXiu2)
  const zhiRiRelation = getXiuRelation(zhiRiXiu1, zhiRiXiu2)
  
  const totalScore = Math.round((benMingRelation.score + zhiRiRelation.score) / 2)
  
  return {
    benMing: {
      person1: {
        xingxiu: benMingXiu1,
        info: benMingXiu1Info
      },
      person2: {
        xingxiu: benMingXiu2,
        info: benMingXiu2Info
      },
      relation: benMingRelation
    },
    zhiRi: {
      person1: {
        xingxiu: zhiRiXiu1,
        info: zhiRiXiu1Info
      },
      person2: {
        xingxiu: zhiRiXiu2,
        info: zhiRiXiu2Info
      },
      relation: zhiRiRelation
    },
    totalScore: totalScore
  }
}

function getLunarDate(year, month, day) {
  const date = new Date(year, month - 1, day)
  const lunarYear = year
  const lunarMonth = month
  const lunarDay = day
  
  const ganZhiYear = getGanZhiYear(lunarYear)
  const ganZhiMonth = getGanZhiMonth(lunarYear, lunarMonth)
  const ganZhiDay = getGanZhiDay(date)
  
  return {
    year: lunarYear,
    month: lunarMonth,
    day: lunarDay,
    yearGanZhi: ganZhiYear,
    monthGanZhi: ganZhiMonth,
    dayGanZhi: ganZhiDay,
    dayZhi: ganZhiDay.substring(1)
  }
}

function getGanZhiYear(year) {
  const gan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
  const zhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  
  const offset = (year - 4) % 60
  const ganIndex = offset % 10
  const zhiIndex = offset % 12
  
  return gan[ganIndex] + zhi[zhiIndex]
}

function getGanZhiMonth(year, month) {
  const gan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
  const zhi = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑']
  
  const yearGanIndex = (year - 4) % 10
  const monthGanIndex = (yearGanIndex * 2 + month - 1) % 10
  const monthZhiIndex = (month - 1) % 12
  
  return gan[monthGanIndex] + zhi[monthZhiIndex]
}

function getGanZhiDay(date) {
  const baseDate = new Date(1900, 0, 1)
  const diffTime = date.getTime() - baseDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
  
  const gan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
  const zhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  
  const ganIndex = (diffDays - 1) % 10
  const zhiIndex = (diffDays - 1) % 12
  
  return gan[ganIndex] + zhi[zhiIndex]
}
