# 《紫图》The Atlas of Purple
# Game design ideas
This is dark-style simulation game that I've still not ready to give it a name.  
If u want to ask what it looks like, my answer is that I got some inspiration from games I played like Anno 1800, Oxygen Not Incluede and Stellaris, I agree that these are perfect games but its not overall like the "simulation" I'm actually anticipating.  
So im gonna write my own version.
# Focus
I personlly enjoy stairing the screen to see how everything is going smoothly, and the "pefect state" im looking for is let the game run itself i can literally AFK. And this is going to be the part im very focusing on when stepping into the numerical design part.  
Ill make the "easy mode" really easy as I know there exists someone like me enjoying bullying machine.  
However, if u want more challenge, here is what i can offer:  
1. The old schooled "higher consumption", "higher maintenence", "disaster", etc
2. Inflation like real world economic  
3. Delay in marketing  
4. adding more of these  

# 判词

## 流程：
开局拥有原始资源，人口，建造，飞升，发展  
胜利条件：达成所有资源的可持续发展，（通过海军技术抵达逆尘海的边缘），通过武器科技征服紫斗仙域的敌人“太苍劫灵”  

## 地图：
“逆尘界”，共有四个大陆，每个大陆可以通过改造拥有最高256(16*16)的土地，以及9000（可能需要调整）的人口  

## 人口：
当拥有足够的资源的时候可以对人口渡劫飞升，提升等级。人后总共拥有四个等级：  
第一步凡修（无数量限制），第二步仙修（无数量限制），第三步仙圣（最多为第二步人口数量的1/10），第四步仙皇（仅可一人）  
人口飞升级维护消耗的资源以住房为单位进行结算。  
对应的人口维护需要消耗对应等级的资源，  
当某一住房没有足够资源维护时，在特定时间单位后会跌落上一等级。  
每一等级的人口都可以提供对应等级的劳动力。  
不同等级的人口间劳动力无法相互转化。  

## 人口迁徙：
逆尘界四个大陆间人口可以通过通勤或移民来维持劳动力稳定。  
通勤和移民的区别之后详细讲。  

## 人口种族：
不同种族的人口可以有不同的天赋，所以适合不同的工作类型  
第一步：人族，魔族，妖族  
第二步：古神，古魔，古妖  
第三步：神灵，仙灵，真灵  
第四步：无类别  

## 资源：
credit, mineral, food, // todo   
总共拥有四个等级，每个等级中分为自然资源和（需要劳动力合成的）推导资源（todo）  
（第一步）：仙玉（货币）零荷（矿物）粟（凡人食物）饭食（零荷、粟合成）仙石（仙玉，零荷合成）  
（第二步）：道晶（货币）  
（第三步）：轮回之根（货币）神丸（矿物）  
（第四步）：  
资源结算周期为年  

## 圣器：
特殊任务道具，可以解锁特殊事件、建筑、武器  

紫薇四神器、紫薇道经：紫薇仙皇遗物  
圣戮天荒、北斗道经：北斗仙皇遗物  
逆海剑、紫斗道经：紫斗仙皇遗物，也是晋升仙皇的必须品  
太古不灭雨：进入逆尘海的定海神针，海军出征的必须物品  

// todo


## 效率：
所有工坊效率由其建筑等级和“工坊和仓库的 grid distance决定（horizontal+vertical instead of diagonal）”  
government不受效率因素影响。  
计算：  
每个资源建筑尽可升级9次，不能进行步数升级，每升级一次效率获得10%提升，最高提升至200%  
当工坊建筑距离仓库 <= 4 时，效率为100%  
当工坊建筑距离仓库 >= 13 时，效率为10%  
两个界限之间的距离每增加一格效率减少10%  
两层效率影响因素分开计算，最终效率为相乘后的结果  
效率的体现方式为生产周期的变化，并不影响每周期的产量  
（这样的设计方式为了避免在JavaScript中的浮点计算）  


## 建筑：
民政大厅（government）  
住房（housing）  
仓库（warehouse）  
特定种类的工坊（workshop）  
military base  
defnese shild  

### 民政大厅（government）：
提供人口管理能力(向下兼容)，每个大陆仅限一个，每一步分为8个小等级，每次升级增加100人口管理能力（100-》200-》300-》- - -》900）  
每次大段位升级提升增加100人口管理能力，但是额外提供高级人口管理能力  
第四步的government有且只有一个，最后一次升级只增加人口，不增加高级人后管理能力  
故每个givernment理论上最多可以提供4000人口管理能力  
每100人口需要一个管理劳动力岗位，故最多40个人口管理岗位  
建造成本算入新大陆的开荒费中  
每年维护费：货币 = 5（基础消耗）+ Math.celling(人口/100)  
升级花费:  
小段位： 50对应等级货币， 10 对应等级矿物，10对应等级建材 // todo  
大段位： 50对应等级货币， 10 对应等级矿物，10对应等级建材 // todo  

#### 人口数量管理策略：
对于第一步和第二步人口，不对人口数量进行限制，理论上第一步人口数量可以===0，但是会导致没有第一步资源的生产  
一个理想的人口组成应该是第二步最多。  

### 住房（housing）：  
提供对应等级人口的住房。基础值为10，可以升级八次，每一次升级capacity增加10 （所有数据均为government的10%）  
大陆住房数量没有限制，当到达人口管理数量上限时，新增住房不会增加总人口  
升级花费:  
小段位：//todo  
第一步-》第二步：//todo  

### 仓库（warehouse）：
提供资源储存空间（向下兼容），大陆所有仓库之间资源相互连通  
（ie， warehouse只是提供储存空间，仓库本身不考虑储存内容，比如需要10单位货币，那么既可以在a处得到，也可以在b处得到）  
容量 = 500 * 10^(等级-1)，每一步可以升级8次，升级容量增加该等级基础容量的容量（500，1000，1500..... 5000,10000,15000）  
资源无法重叠，  
当任意一等级的资源数量总和大于大陆所能提供的对应等级的容量总和时，即视为资源爆仓。  
爆仓资源没有buffer，会立即失去。  
///////////////之后慢慢想别的建筑  
