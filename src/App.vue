<template>
  <div class="app">
    <div class="container">
      <h1 class="title">命缘测算</h1>
      <p class="subtitle">八字 · 星宿 · 星座 合盘分析</p>
      
      <div class="card">
        <div class="form-section">
          <h2 class="section-title">输入信息</h2>
          
          <div class="person-inputs-row">
            <div class="person-input">
              <h3 class="person-title">人员1</h3>
              <div class="form-group">
                <label>性别</label>
                <select v-model="person1.gender">
                  <option value="male">男</option>
                  <option value="female">女</option>
                </select>
              </div>
              <div class="form-group">
                <label>出生日期</label>
                <input type="date" v-model="person1.birthDate" />
              </div>
              <div class="form-group">
                <label>出生时间</label>
                <input type="time" v-model="person1.birthTime" />
              </div>
            </div>
            
            <div class="person-input">
              <h3 class="person-title">人员2</h3>
              <div class="form-group">
                <label>性别</label>
                <select v-model="person2.gender">
                  <option value="male">男</option>
                  <option value="female">女</option>
                </select>
              </div>
              <div class="form-group">
                <label>出生日期</label>
                <input type="date" v-model="person2.birthDate" />
              </div>
              <div class="form-group">
                <label>出生时间</label>
                <input type="time" v-model="person2.birthTime" />
              </div>
            </div>
          </div>
          
          <button class="calculate-btn" @click="calculate" :disabled="loading">
            {{ loading ? '计算中...' : '开始测算' }}
          </button>
        </div>
        
        <div v-if="result" class="result-section">
          <h2 class="section-title">测算结果</h2>
          
          <div class="overall-score">
            <div class="score-circle" :style="{ borderColor: result.level.color }">
              <span class="score-icon">{{ result.level.icon }}</span>
              <span class="score-value">{{ result.overallScore }}</span>
              <span class="score-label">综合契合度</span>
            </div>
            <div class="level-text" :style="{ color: result.level.color }">
              {{ result.level.level }}
            </div>
          </div>
          
          <div class="summary">
            <p>{{ result.summary }}</p>
          </div>
          
          <div class="dimensions">
            <h3>维度分析</h3>
            <div v-for="dim in result.dimensions" :key="dim.name" class="dimension-item">
              <div class="dimension-header">
                <span class="dimension-name">{{ dim.name }}</span>
                <span class="dimension-value">{{ dim.value }}/{{ dim.max }}</span>
              </div>
              <div class="dimension-bar">
                <div class="dimension-progress" :style="{ width: (dim.value / dim.max * 100) + '%' }"></div>
              </div>
              <div v-if="dim.details && dim.details.length > 0" class="dimension-details">
                <div v-for="(detail, idx) in dim.details" :key="idx" class="detail-item">
                  <span class="detail-type">{{ detail.type }}:</span>
                  <span class="detail-desc">{{ detail.desc }}</span>
                  <span class="detail-score" :style="{ color: getScoreColor(detail.score) }">{{ detail.score }}分</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="xingxiu-details">
            <h3>星宿详情</h3>
            <div class="xingxiu-section">
              <h4>本命星宿</h4>
              <div class="xingxiu-comparison">
                <div class="xingxiu-person">
                  <h5>人员1</h5>
                  <div class="xingxiu-info">
                    <span class="xingxiu-name">{{ result.xingxiu.benMing.person1.info.name }}</span>
                    <span class="xingxiu-luck">{{ result.xingxiu.benMing.person1.info.luck }}</span>
                  </div>
                  <div class="xingxiu-desc">{{ result.xingxiu.benMing.person1.info.song }}</div>
                </div>
                <div class="xingxiu-relation">
                  <div class="relation-type">{{ result.xingxiu.benMing.relation.relation }}</div>
                  <div class="relation-score" :style="{ color: getScoreColor(result.xingxiu.benMing.relation.score) }">{{ result.xingxiu.benMing.relation.score }}分</div>
                  <div class="relation-desc">{{ result.xingxiu.benMing.relation.description }}</div>
                </div>
                <div class="xingxiu-person">
                  <h5>人员2</h5>
                  <div class="xingxiu-info">
                    <span class="xingxiu-name">{{ result.xingxiu.benMing.person2.info.name }}</span>
                    <span class="xingxiu-luck">{{ result.xingxiu.benMing.person2.info.luck }}</span>
                  </div>
                  <div class="xingxiu-desc">{{ result.xingxiu.benMing.person2.info.song }}</div>
                </div>
              </div>
            </div>
            <div class="xingxiu-section">
              <h4>值日星宿</h4>
              <div class="xingxiu-comparison">
                <div class="xingxiu-person">
                  <h5>人员1</h5>
                  <div class="xingxiu-info">
                    <span class="xingxiu-name">{{ result.xingxiu.zhiRi.person1.info.name }}</span>
                    <span class="xingxiu-luck">{{ result.xingxiu.zhiRi.person1.info.luck }}</span>
                  </div>
                  <div class="xingxiu-desc">{{ result.xingxiu.zhiRi.person1.info.song }}</div>
                </div>
                <div class="xingxiu-relation">
                  <div class="relation-type">{{ result.xingxiu.zhiRi.relation.relation }}</div>
                  <div class="relation-score" :style="{ color: getScoreColor(result.xingxiu.zhiRi.relation.score) }">{{ result.xingxiu.zhiRi.relation.score }}分</div>
                  <div class="relation-desc">{{ result.xingxiu.zhiRi.relation.description }}</div>
                </div>
                <div class="xingxiu-person">
                  <h5>人员2</h5>
                  <div class="xingxiu-info">
                    <span class="xingxiu-name">{{ result.xingxiu.zhiRi.person2.info.name }}</span>
                    <span class="xingxiu-luck">{{ result.xingxiu.zhiRi.person2.info.luck }}</span>
                  </div>
                  <div class="xingxiu-desc">{{ result.xingxiu.zhiRi.person2.info.song }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="advice">
            <h3>建议</h3>
            <ul>
              <li v-for="(advice, idx) in result.advice" :key="idx">{{ advice }}</li>
            </ul>
          </div>
        </div>
        
        <div v-if="error" class="error">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { calculateOverallCompatibility } from './utils/compatibilityCalculator.js'

const person1 = ref({
  gender: 'male',
  birthDate: '',
  birthTime: '12:00'
})

const person2 = ref({
  gender: 'female',
  birthDate: '',
  birthTime: '12:00'
})

const loading = ref(false)
const result = ref(null)
const error = ref('')

function calculate() {
  if (!person1.value.birthDate || !person2.value.birthDate) {
    error.value = '请填写完整的出生日期'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const p1Date = new Date(person1.value.birthDate)
    const p2Date = new Date(person2.value.birthDate)
    
    const p1Time = person1.value.birthTime.split(':')
    const p2Time = person2.value.birthTime.split(':')
    
    const person1Data = {
      gender: person1.value.gender,
      birthDate: {
        year: p1Date.getFullYear(),
        month: p1Date.getMonth() + 1,
        day: p1Date.getDate(),
        hour: parseInt(p1Time[0])
      }
    }
    
    const person2Data = {
      gender: person2.value.gender,
      birthDate: {
        year: p2Date.getFullYear(),
        month: p2Date.getMonth() + 1,
        day: p2Date.getDate(),
        hour: parseInt(p2Time[0])
      }
    }
    
    result.value = calculateOverallCompatibility(person1Data, person2Data)
  } catch (e) {
    error.value = '计算出错: ' + e.message
    console.error(e)
  } finally {
    loading.value = false
  }
}

function getScoreColor(score) {
  if (score >= 80) return '#ff4757'
  if (score >= 60) return '#ffa502'
  if (score >= 40) return '#eccc68'
  return '#7bed9f'
}
</script>

<style scoped>
.app {
  width: 100%;
}

.container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.title {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 18px;
  text-align: center;
  color: #666;
  margin-bottom: 40px;
}

.card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.person-inputs-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.person-input {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  height: fit-content;
}

.person-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #667eea;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.calculate-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.calculate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.calculate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result-section {
  margin-top: 40px;
  padding-top: 40px;
  border-top: 2px solid #eee;
}

.overall-score {
  text-align: center;
  margin-bottom: 30px;
}

.score-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid #667eea;
  margin: 0 auto 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
}

.score-icon {
  font-size: 32px;
  margin-bottom: 5px;
}

.score-value {
  font-size: 48px;
  font-weight: bold;
  color: #333;
}

.score-label {
  font-size: 12px;
  color: #666;
}

.level-text {
  font-size: 28px;
  font-weight: bold;
  margin-top: 10px;
}

.summary {
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  text-align: center;
  font-size: 16px;
  line-height: 1.6;
  color: #555;
}

.dimensions {
  margin-bottom: 30px;
}

.dimensions h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.xingxiu-details {
  margin-bottom: 30px;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  padding: 20px;
  border-radius: 10px;
}

.xingxiu-details h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.xingxiu-section {
  margin-bottom: 20px;
}

.xingxiu-section:last-child {
  margin-bottom: 0;
}

.xingxiu-section h4 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #667eea;
}

.xingxiu-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  align-items: center;
}

.xingxiu-person {
  background: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.xingxiu-person h5 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #555;
}

.xingxiu-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
}

.xingxiu-name {
  font-size: 18px;
  font-weight: bold;
  color: #667eea;
}

.xingxiu-luck {
  font-size: 12px;
  color: #999;
}

.xingxiu-desc {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
}

.xingxiu-relation {
  background: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  border: 2px solid #667eea;
}

.relation-type {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #667eea;
}

.relation-score {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}

.relation-desc {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
}

.dimension-item {
  margin-bottom: 20px;
}

.dimension-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.dimension-name {
  font-weight: 500;
  color: #555;
}

.dimension-value {
  font-weight: bold;
  color: #667eea;
}

.dimension-bar {
  height: 10px;
  background: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
}

.dimension-progress {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.5s ease;
}

.dimension-details {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-type {
  font-weight: 500;
  color: #667eea;
}

.detail-desc {
  flex: 1;
  margin: 0 15px;
  color: #555;
}

.detail-score {
  font-weight: bold;
}

.advice {
  background: #fff9e6;
  padding: 20px;
  border-radius: 10px;
  border-left: 4px solid #ffa502;
}

.advice h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #ffa502;
}

.advice ul {
  list-style: none;
  padding: 0;
}

.advice li {
  padding: 8px 0;
  color: #555;
  line-height: 1.6;
}

.advice li::before {
  content: "💡 ";
  margin-right: 8px;
}

.error {
  background: #ffe6e6;
  color: #ff4757;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .form-section {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 20px;
  }
  
  .title {
    font-size: 32px;
  }
}
</style>
