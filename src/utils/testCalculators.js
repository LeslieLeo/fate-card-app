import { calculateBazi, calculateCompatibility } from './baziCalculator.js';
import { calculateXingxiuCompatibility } from './xingxiuCalculator.js';
import { calculateAstrologyCompatibility } from './astrologyCalculator.js';
import { calculateOverallCompatibility } from './compatibilityCalculator.js';

console.log('=== 测试八字计算 ===');

const testPerson1 = {
  birthDate: {
    year: 1990,
    month: 5,
    day: 15,
    hour: 10
  }
};

const testPerson2 = {
  birthDate: {
    year: 1992,
    month: 8,
    day: 20,
    hour: 14
  }
};

let bazi1, bazi2;

try {
  bazi1 = calculateBazi(
    testPerson1.birthDate.year,
    testPerson1.birthDate.month,
    testPerson1.birthDate.day,
    testPerson1.birthDate.hour
  );
  
  console.log('测试人员1的八字：');
  console.log('年柱：', bazi1.year);
  console.log('月柱：', bazi1.month);
  console.log('日柱：', bazi1.day);
  console.log('时柱：', bazi1.hour);
  console.log('生肖：', bazi1.shengxiao);
  console.log('日主根气：', bazi1.gen);
  console.log('');
  
  bazi2 = calculateBazi(
    testPerson2.birthDate.year,
    testPerson2.birthDate.month,
    testPerson2.birthDate.day,
    testPerson2.birthDate.hour
  );
  
  console.log('测试人员2的八字：');
  console.log('年柱：', bazi2.year);
  console.log('月柱：', bazi2.month);
  console.log('日柱：', bazi2.day);
  console.log('时柱：', bazi2.hour);
  console.log('生肖：', bazi2.shengxiao);
  console.log('日主根气：', bazi2.gen);
  console.log('');
  
  const baziCompatibility = calculateCompatibility(bazi1, bazi2);
  console.log('八字匹配度：', baziCompatibility.score);
  console.log('匹配详情：', baziCompatibility.details);
  console.log('');
  
} catch (error) {
  console.error('八字计算测试失败：', error);
}

console.log('=== 测试星宿计算 ===');

try {
  const xingxiuResult = calculateXingxiuCompatibility(
    bazi1,
    bazi2,
    testPerson1.birthDate,
    testPerson2.birthDate
  );
  
  console.log('本命星宿：');
  console.log('人员1：', xingxiuResult.benMing.xingxiu1.name);
  console.log('人员2：', xingxiuResult.benMing.xingxiu2.name);
  console.log('关系：', xingxiuResult.benMing.relation.name, '(', xingxiuResult.benMing.relation.score, '分)');
  console.log('');
  
  console.log('值日星宿：');
  console.log('人员1：', xingxiuResult.zhiRi.xingxiu1.name);
  console.log('人员2：', xingxiuResult.zhiRi.xingxiu2.name);
  console.log('关系：', xingxiuResult.zhiRi.relation.name, '(', xingxiuResult.zhiRi.relation.score, '分)');
  console.log('');
  
  console.log('星宿总匹配度：', xingxiuResult.totalScore);
  console.log('');
  
} catch (error) {
  console.error('星宿计算测试失败：', error);
}

console.log('=== 测试星座计算 ===');

try {
  const astrologyResult = calculateAstrologyCompatibility(
    testPerson1.birthDate,
    testPerson2.birthDate
  );
  
  console.log('星座：');
  console.log('人员1：', astrologyResult.sign1.name, astrologyResult.sign1.symbol);
  console.log('人员2：', astrologyResult.sign2.name, astrologyResult.sign2.symbol);
  console.log('');
  
  console.log('星座匹配详情：');
  astrologyResult.details.forEach(detail => {
    console.log(detail.type, '：', detail.desc, '(', detail.score, '分)');
  });
  console.log('');
  
  console.log('星座总匹配度：', astrologyResult.totalScore);
  console.log('');
  
} catch (error) {
  console.error('星座计算测试失败：', error);
}

console.log('=== 测试综合匹配计算 ===');

try {
  const overallResult = calculateOverallCompatibility(testPerson1, testPerson2);
  
  console.log('综合匹配度：', overallResult.overallScore);
  console.log('匹配等级：', overallResult.level.level, overallResult.level.icon);
  console.log('');
  
  console.log('六维匹配：');
  overallResult.dimensions.forEach(dimension => {
    console.log(dimension.name, '：', dimension.value, '/', dimension.max);
  });
  console.log('');
  
  console.log('匹配总结：', overallResult.summary);
  console.log('');
  
  console.log('匹配建议：');
  overallResult.advice.forEach(advice => {
    console.log('- ', advice);
  });
  console.log('');
  
} catch (error) {
  console.error('综合匹配计算测试失败：', error);
}

console.log('=== 测试完成 ===');
