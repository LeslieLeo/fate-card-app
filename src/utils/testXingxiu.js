import { getXiuByDate, getXiuInfo, getXiuRelation, getBenMingXiu, getZhiRiXiu, getXiuCompatibility } from './xingxiuCalculator.js'

console.log('=== 星宿计算测试 ===\n')

const testCases = [
  { year: 1990, month: 5, day: 15, name: '测试1' },
  { year: 1995, month: 8, day: 20, name: '测试2' },
  { year: 2000, month: 1, day: 1, name: '测试3' },
  { year: 1988, month: 12, day: 25, name: '测试4' }
]

console.log('1. 测试星宿获取功能:')
testCases.forEach((test, index) => {
  const xiu = getXiuByDate(test.year, test.month, test.day)
  console.log(`${test.name} (${test.year}-${test.month}-${test.day}): 星宿 = ${xiu}`)
})

console.log('\n2. 测试星宿详细信息:')
const testDate = testCases[0]
const xiu = getXiuByDate(testDate.year, testDate.month, testDate.day)
const xiuInfo = getXiuInfo(xiu)
console.log(`星宿: ${xiuInfo.name}`)
console.log(`吉凶: ${xiuInfo.luck}`)
console.log(`五行: ${xiuInfo.zheng}`)
console.log(`动物: ${xiuInfo.animal}`)
console.log(`方位: ${xiuInfo.gong}`)
console.log(`歌诀: ${xiuInfo.song.substring(0, 20)}...`)

console.log('\n3. 测试星宿关系计算:')
const xiu1 = '角'
const xiu2 = '亢'
const relation = getXiuRelation(xiu1, xiu2)
console.log(`星宿 ${xiu1} 和 ${xiu2}:`)
console.log(`  关系: ${relation.relation}`)
console.log(`  分数: ${relation.score}`)
console.log(`  描述: ${relation.description}`)

console.log('\n4. 测试本命星宿:')
testCases.forEach((test, index) => {
  const benMingXiu = getBenMingXiu(test.year, test.month, test.day)
  console.log(`${test.name}: 本命星宿 = ${benMingXiu.name} (${benMingXiu.luck})`)
})

console.log('\n5. 测试值日星宿:')
const today = new Date()
const zhiRiXiu = getZhiRiXiu(today.getFullYear(), today.getMonth() + 1, today.getDate())
console.log(`今天 (${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}): 值日星宿 = ${zhiRiXiu.name} (${zhiRiXiu.luck})`)

console.log('\n6. 测试星宿配对:')
const birth1 = testCases[0]
const birth2 = testCases[1]
const compatibility = getXiuCompatibility(birth1, birth2)
console.log(`人员1 (${birth1.year}-${birth1.month}-${birth1.day}): 星宿 = ${compatibility.person1.xiu}`)
console.log(`人员2 (${birth2.year}-${birth2.month}-${birth2.day}): 星宿 = ${compatibility.person2.xiu}`)
console.log(`本命星宿关系: ${compatibility.benMingRelation.relation}`)
console.log(`综合分数: ${compatibility.overallScore}`)

console.log('\n7. 测试所有星宿关系:')
const allXiu = ['角', '亢', '氐', '房', '心', '尾', '箕', '斗', '牛', '女', '虚', '危', '室', '壁', '奎', '娄', '胃', '昴', '毕', '觜', '参', '井', '鬼', '柳', '星', '张', '翼', '轸']
console.log('测试前5个星宿之间的关系:')
for (let i = 0; i < 5; i++) {
  for (let j = i; j < Math.min(i + 3, allXiu.length); j++) {
    const rel = getXiuRelation(allXiu[i], allXiu[j])
    console.log(`  ${allXiu[i]} - ${allXiu[j]}: ${rel.relation} (${rel.score}分)`)
  }
}

console.log('\n=== 测试完成 ===')
