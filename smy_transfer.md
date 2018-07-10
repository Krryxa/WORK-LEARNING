# 多选穿梭框总结

> 框架：vue 2.x，UI 组件：Element

## 示例
![](https://github.com/Krryxa/WORK-LEARNING/blob/master/images/city.jpg)

## 介绍
- 实现省市区三级多选联动，可任选一个省级、市级、区级，加入已选框，也可以在已选框中删除对应的区域。
- 选择同样地区，选择省级或市级，若该对象下面的市级或区级已有选择，就自动合并为一个省级或市级：

```
例如：
已选择：广东省广州市荔湾区
点击加入：广东省广州市
最后显示：广东省广州市
广州市已被选择，对应市级的区将不显示，只显示对应的市

同理：选择广东省，也将下面已选择的所有的市或区合并成一个省级，只显示这个省级
```

## 设计
- 拆分组件：三个区域框和一个已选框相似，复用一个组件 transfer，放在一个父组件中

## 源码
### 父组件：
```html
<template>
  <div>
    <el-form-item label="地区：">
      <transfer :titleId="0" :operation="operation[0]" :district-list="provinceList" @check-district="checkProvince" @selected-checked="selectedProvince"></transfer>
      <transfer :titleId="1" :operation="operation[1]" ref="city" :district-list="cityList" @check-district="checkCity" @selected-checked="selectedCity"></transfer>
      <transfer :titleId="2" :operation="operation[2]" ref="country" :district-list="country" @selected-checked="selectedCountry"></transfer>
      <span class="inner-center el-icon-d-arrow-right"></span>
      <transfer :titleId="3" :operation="operation[3]" style="width: 220px" :district-list="selectDistrict" @delete-checked="deleteCheck"></transfer>
    </el-form-item>
  </div>
</template>
```
```javascript
<script>
import Transfer from './Transfer';

export default {
  data () {
    return {
      operation: ['添加选中省份', '添加选中城市', '添加选中区域', '删除选中地区'],
      provinceList: [], // 省级数据
      cityList: [], // 市级数据
      country: [], // 区级数据

      selectDistrict: [], // 选中的区域数据

      proFilter: [], // 省级过滤id
      cityFilter: [], // 市级过滤id
      countryFilter: [], // 县级过滤id

      districtListMock: {  // 模拟数据
        "province": {
          "101101": "北京市",
          "101102": "天津市",
          "101103": "河北省",
          "101104": "山西省",
          "101105": "内蒙古自治区",
          "102101": "辽宁省",
          "102102": "吉林省",
        },
        "city": {
          "101101": [
            {
              "id": 101101101112,
               "text": "通州区"
            },                       
            {
              "id": 101101101111,
              "text": "房山区"
            }
          ],
          "101102": [
            {
              "id": 101102101111,
              "text": "西青区"
            },
            {
              "id": 101102101112,
              "text": "津南区"
            }
          ]
        },
        "country": {
          "101102101111": [
            {
              "id": 10610514242126,
              "text": "和县"
            },
            {
              "id": 106105142415416125,
              "text": "裕1县"
            },
          ],
          "101102101112": [
            {
              "id": 101242126,
              "text": "和84县"
            },
            {
              "id": 1424116125,
              "text": "龙川县"
            },
          ],
          "101101101112": [
            {
              "id": 106105142126,
              "text": "和布克赛尔蒙古自治县"
            },
            {
              "id": 106105142125,
              "text": "裕民县"
            },
          ],
          "101101101111": [
            {
              "id": 106105143124,
              "text": "哈巴河县"
            },
            {
              "id": 106105143125,
              "text": "青河县"
            }
          ]
        },
      },
    };
  },
  created () {
    this.getProvince();
  },
  methods: {
    // 获取省级数据
    getProvince () {
      this.provinceList = []; // 首先清空
      for (let key in this.districtListMock['province']) {
        this.provinceList.push({
          id: key,
          text: this.districtListMock['province'][key],
        });
        // 省级过滤处理
        this.filterProvince();
      }
    },
    // 获取市级数据，子组件自定义的穿梭框传回的数据，val：[区域obj, 区域obj,...]
    checkProvince (val) {
      let obj = val[val.length-1];
      let flag = true;
      if (obj !== undefined) {
        let id = obj.id;
        for (let key in this.districtListMock['city']) {
          if (id === key) {
            // 匹配到的id，将对应的市级数据传递到子组件
            this.cityList = this.districtListMock['city'][key];
            // 过滤处理
            this.filterCity();
            // 过滤处理
            // 再清空上一次的县级数据
            this.country = [];
            // 将父级对象放进市级组件
            this.$refs.city.father = {
              id: id,
              text: obj.text,
            };
            flag = false;
            break;
          }  
        }
      }
      // 如果市级没有匹配到，市级和区级都显示为空
      if (flag) {
        this.cityList = [];
        this.country = [];
      }
    },
    // 获取县级数据，子组件自定义的穿梭框传回的数据，val：[区域obj, 区域obj,...]
    checkCity (val) {
      let obj = val[val.length-1];
      let flag = true;
      if (obj !== undefined) {
        let id = obj.id;
        for (let key in this.districtListMock['country']) {
          if (id.toString() == key) {
            // 匹配到的id，将对应的区级数据传递到子组件
            this.country = this.districtListMock['country'][key];
            // 过滤处理
            this.filterCountry();
            // 获取省级的数据
            let fatherId = this.$refs.city.father.id;
            let fatherText = this.$refs.city.father.text;
            // 拼接上市级数据放进县级组件
            this.$refs.country.father = {
              id: fatherId+'-'+id,
              text: fatherText+'-'+obj.text,
            };
            flag = false;
            break;
          }
        }
      }
      // 区级没有匹配到，显示为空
      if (flag) {
        this.country = [];
      }
    },
    // 从省级添加到已选区域
    selectedProvince (val, filterId) {
      this.selectDistrict = this.selectDistrict.concat(val);
      this.proFilter = this.proFilter.concat(filterId);
      // 如果过滤的市级区域，还有县级区域，合并成一个市级
      for (let val of filterId) {
        for (let vq of this.selectDistrict) {
          let selectId = vq.id.split('-');
          // 拆分的数组长度大于1，说明有市级以下的区域，合并成一个省级区域
          if (selectId.length > 1 && selectId[0] === val) {
            // 在已选择的区域中删除市级数据，合并成一个省级
            this.selectDistrict = this.selectDistrict.filter(vl => vl !== vq);
            // 当前省级已被合并，从过滤数组中删除该市级和县级数据
            this.cityFilter = this.cityFilter.filter(vf => vf.toString() !== selectId[1]);
            this.countryFilter = this.countryFilter.filter(vs => vs.toString() !== selectId[2]);
          }
        }
      }
      // 清空下面的市级和县级区域
      this.cityList = [];
      this.country = [];
      // 过滤处理
      this.filterProvince();
    },
    // 从市级添加到已选区域
    selectedCity (val, filterId) {
      this.selectDistrict = this.selectDistrict.concat(val);
      this.cityFilter = this.cityFilter.concat(filterId);
      // 如果过滤的市级区域，还有县级区域，合并成一个市级
      for (let val of filterId) {
        for (let vq of this.selectDistrict) {
          let selectId = vq.id.split('-');
          // 拆分的数组长度为3，说明有县级区域，并且该市级区域与当前加入市级区域的id相同，合并成一个市级区域
          if (selectId.length === 3 && selectId[1] === val.toString()) {
            // 在已选择的区域中删除县级数据，合并成一个市级
            this.selectDistrict = this.selectDistrict.filter(vl => vl !== vq);
            // 当前市级已被合并，从过滤数组中删除该县级数据
            this.countryFilter = this.countryFilter.filter(vs => vs.toString() !== selectId[2]);
          }
        }
      }
      // 清空下面的县级区域
      this.country = [];
      // 过滤处理
      this.filterCity();
    },
    // 从县级添加到已选区域
    selectedCountry (val, filterId) {
      this.selectDistrict = this.selectDistrict.concat(val);
      this.countryFilter = this.countryFilter.concat(filterId);
      // 过滤处理
      this.filterCountry();
    },
    // 省级过滤处理
    filterProvince () {
      let newPro = Array.from(this.provinceList);
      for (let val of this.proFilter) {
        newPro = newPro.filter(vq => vq.id !== val);
      }
      this.provinceList = Array.from(newPro);
    },
    // 市级过滤处理
    filterCity () {
      let newCity = Array.from(this.cityList);
      for (let val of this.cityFilter) {
        newCity = newCity.filter(vq => vq.id !== val);
      }
      this.cityList = Array.from(newCity);
    },
    // 县级过滤处理
    filterCountry () {
      let newCountry = Array.from(this.country);
      for (let val of this.countryFilter) {
        newCountry = newCountry.filter(vq => vq.id !== val);
      }
      this.country = Array.from(newCountry);
    },
    // 删除已选区域
    deleteCheck (selecteVal) {
      let proFlag = false;
      let cityFlag = false;
      let counFlag = false;
      for (let val of selecteVal) {
        let selectId = val.id.split('-');
        let length = selectId.length;
        if (length === 1) {
          // 长度只有1，只有省级数据，删除对应省级的filter中的数据
          this.proFilter = this.proFilter.filter(vs => vs !== selectId[0]);
          // 重新获取县级数据
          this.getProvince();
        } else if (length === 2) {
          // 长度为2，到达市级数据，删除对应市级的filter中的数据
          this.cityFilter = this.cityFilter.filter(vs => vs.toString() !== selectId[1]);
          // 重新获取市级数据
          this.checkProvince([this.$refs.city.father]);
        } else {
          // 长度为3，到达县级数据，删除对应县级的filter中的数据
          this.countryFilter = this.countryFilter.filter(vs => vs.toString() !== selectId[2]);
          // 重新获取县级数据，参数：当前市级ID的对象数组：obj:[{id:id,text:text}]
          let fatherId = this.$refs.country.father.id.split('-')[1];
          let fatherText = this.$refs.country.father.text.split('-')[1];
          let obj = [{id: fatherId, text: fatherText}];
          this.checkCity(obj);
        }
        // 刷新已选区域
        this.selectDistrict = this.selectDistrict.filter(vd => vd.id !== val.id);
      }
    },
  },
  components: {
    Transfer,
  },
};
</script>
```
``` css
<style lang='scss' scoped>
.inner-center {
  margin: 0 5px;
}
</style>
```

### 子组件
```html
<template>
  <div class="el-transfer-panel district-panel">
    <div class="el-transfer-panel__header">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{title[titleId]}}</el-checkbox>
      <span class="check-number">{{checkedCities.length}}/{{districtListMock.length}}</span>
    </div>
    <div class="el-transfer-panel__body">
      <div class="el-transfer-panel__filter el-input el-input--small el-input--prefix">
        <input type="text" v-model="searchWord" autocomplete="off" placeholder="请输入搜索内容" class="el-input__inner">
        <span class="el-input__prefix"><i class="el-input__icon el-icon-search"></i></span>
      </div>
      <el-checkbox-group v-model="checkedCities" v-if="districtListMock.length > 0" @change="handleCheckedChange">
        <el-checkbox v-for="city in districtListMock" class="el-transfer-panel__item" :label="city" :key="city.id">{{city.text}}</el-checkbox>
      </el-checkbox-group>
      <p class="no-data" v-else>无数据</p>
    </div>
    <div class="vip-footer">
      <el-button type="text" :disabled="checkedCities.length > 0 ? false : true" size="small" round @click="checkedSelected">
        <span>{{operation}}</span>
      </el-button>
    </div>
  </div>
</template>
```
```javascript

<script>

export default {
  props: {
    titleId: {
      type: Number,
    },
    districtList: { // 父组件传递的区域数据
      type: Array,
    },
    operation: {
      type: String,
    },
  },
  data () {
    return {
      title: ['省份', '城市', '区域', '选中地区'],
      districtListMock: [], // 展示的数据 （搜索会自动修改这个数组）
      checkedCities: [], // 已选择，数据格式：[区域id,id,id...]
      father: {}, // 父级数据
      isIndeterminate: false,
      checkAll: false,
      searchWord: '',
      buttonAble: true,
    };
  },
  created () {
    this.getDistrict();
  },
  watch: {
    searchWord (newWord, oldWord) {
      if (newWord === '') {
        // 搜索框为空，重新获取数据
        this.getDistrict();
      } else {
        // 搜索框不为空，就过滤掉数据，保留搜索的数据
        this.districtListMock = this.districtListMock.filter(val => val.text.includes(newWord));
      }
    },
    // 当点击省级或市级，自动监听并更新市级或区级的列表
    districtList () {
      this.getDistrict();
      // 如果区域数据为空，则已选择的数据也要清空
      if (this.districtList.length === 0) {
        this.checkedCities = [];
      }
    },
  },
  methods: {
    // 获取区域数据
    getDistrict () {
      this.districtListMock = this.districtList;
      // 已选择的清空
      this.checkedCities = [];
    },
    // 单选
    handleCheckedChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.districtListMock.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.districtListMock.length;
      // 子传父
      this.$emit('check-district', value);
    },
    // 全选
    handleCheckAllChange (val) {
      this.checkedCities = val ? this.districtListMock.map(val => val) : [];
      this.isIndeterminate = false;
    },
    // 添加至已选 或 删除已选区域
    checkedSelected () {
      let selectedList = [];
      let filterId = [];
      if (this.titleId === 0) {
        // 省级添加
        for (let val of this.checkedCities) {
          selectedList.push({
            id: val.id,
            text: val.text,
          });
          filterId.push(val.id);
        }
        this.$emit('selected-checked', selectedList, filterId);
      } else if (this.titleId === 1 || this.titleId === 2) {
        // 市级或县级添加
        for (let val of this.checkedCities) {
          selectedList.push({
            id: this.father.id+'-'+val.id,
            text: this.father.text+'-'+val.text,
          });
          filterId.push(val.id);
        }
        this.$emit('selected-checked', selectedList, filterId);
      } else {
        // 删除已选区域
        for (let val of this.checkedCities) {
          selectedList.push({
            id: val.id,
            text: val.text,
          });
        }
        this.$emit('delete-checked', selectedList);
      }
    },
  },
  components: {
  },
};
</script>
```

```css

<style lang="scss" scoped>
.district-panel {
  width: 170px;
  .el-checkbox-group {
    height: 191px;
    overflow: auto;
  }
  .check-number {
    position: absolute;
    right: 15px;
    top: 0;
    color: #909399;
    font-size: 12px;
    font-weight: 400;
  }
  .no-data {
    margin: 0;
    height: 30px;
    line-height: 30px;
    padding: 6px 15px 0;
    color: #909399;
    text-align: center;
  }
  .vip-footer {
    position: relative;
    margin: 0;
    padding: 5px 0;
    text-align: center;
    border-top: 1px solid #ebeef5;
  }
}
</style>
```
