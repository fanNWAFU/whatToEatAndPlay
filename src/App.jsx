import React, { useState, useEffect } from 'react';
import {
  Mail,
  Utensils,
  Ticket,
  Sparkles,
  MapPin,
  CalendarHeart,
  Pencil,
} from 'lucide-react';

export default function App() {
  const [step, setStep] = useState(0);
  const [food, setFood] = useState('');
  const [activity, setActivity] = useState('');
  const [customActivity, setCustomActivity] = useState('');
  const [isRolling, setIsRolling] = useState(false);
  const [currentRollIndex, setCurrentRollIndex] = useState(0);

  // 新增彩蛋相关的状态
  const [redrawCount, setRedrawCount] = useState(0);
  const [showFoodEasterEgg, setShowFoodEasterEgg] = useState(false);
  const [customFood, setCustomFood] = useState('');

  // 新增翻翻专属私房菜状态
  const [fanfanCooks, setFanfanCooks] = useState('');

  // 新增爆米花撒花特效状态
  const [showCelebration, setShowCelebration] = useState(false);

  const foodOptions = [
    { name: '火锅 🍲' },
    { name: '烤肉 🥩' },
    { name: '烧烤 🍢' },
    { name: '烤鱼 🐟' },
    { name: '椰子鸡 🥥' },
    { name: '贵州酸汤火锅 🍅' },
    { name: '寿喜锅 🥘' },
    { name: '日料 🍣' },
    { name: '粤菜 🥟' },
    { name: '淮扬菜 🦆' },
    { name: '川湘菜 🌶️' },
    { name: '江西小炒 🍳' },
    { name: '云贵特色风味 ⛰️' },
    { name: '东南亚菜 🇹🇭' },
    { name: '西餐/牛排 🍽️' },
    { name: '披萨/意面 🍕' },
    { name: '嗦粉 🍜' },
    { name: '夜市 🌮' },
    { name: '奶茶/甜品 🧋' },
    { name: '轻食 🥗' },
    { name: '逛超市 🦞' },
    { name: '炸鸡 🍗' },
    { name: '小笼包 🥟' },
    { name: '烤面筋 🍡' },
  ];

  const activityOptions = [
    { name: '看电影 🎬', icon: '🍿' },
    { name: '电玩城 🧸', icon: '🕹️' },
    { name: '去猫咖/狗咖 🐾', icon: '🐱' },
    { name: '散步吹晚风 🚶‍♀️', icon: '🌙' },
    { name: '密室逃脱/剧本杀 🧩', icon: '🕵️' },
    { name: '看展 🖼️', icon: '🎨' },
    { name: 'DIY手工 🏺', icon: '✨' },
    { name: '听LiveHouse 🎵', icon: '🎤' },
    { name: '逛夜市 🏮', icon: '🍢' },
    { name: '滑冰/蹦床 ⛸️', icon: '🤸‍♀️' },
    { name: '清吧 🍷', icon: '🥂' },
    { name: '兜风/骑行夜游 🚲', icon: '🌃' },
  ];

  // 模拟抽奖滚动效果
  const startRolling = () => {
    setIsRolling(true);
    setShowCelebration(false); // 每次滚动时重置特效
    let count = 0;
    const maxCount = 20; // 滚动次数
    const interval = setInterval(() => {
      setCurrentRollIndex(Math.floor(Math.random() * foodOptions.length));
      count++;
      if (count >= maxCount) {
        clearInterval(interval);
        setIsRolling(false);
        const finalFood =
          foodOptions[Math.floor(Math.random() * foodOptions.length)];
        setFood(finalFood);

        // 停止瞬间触发庆祝特效
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000); // 2秒后自动消失
      }
    }, 100);
  };

  // 新增重抽处理逻辑
  const handleRedraw = () => {
    if (redrawCount >= 1) {
      // 已经是第2次点击重抽了，触发彩蛋
      setShowFoodEasterEgg(true);
      setFood(''); // 清空原本的随机结果
      setShowCelebration(false);
    } else {
      setRedrawCount((prev) => prev + 1);
      startRolling();
    }
  };

  const handleReset = () => {
    setStep(0);
    setFood('');
    setActivity('');
    setCustomActivity('');
    // 重置时清空彩蛋状态
    setRedrawCount(0);
    setShowFoodEasterEgg(false);
    setCustomFood('');
    setFanfanCooks('');
    setShowCelebration(false);
  };

  // 提取食物名字中的 Emoji 用于撒花特效
  const getFoodEmoji = (foodName) => {
    if (!foodName) return '✨';
    const match = foodName.match(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u);
    return match ? match[0] : '✨';
  };

  return (
    <div className="min-h-[100dvh] bg-orange-50 flex flex-col items-center justify-center p-4 sm:p-6 font-sans text-gray-800 relative overflow-hidden select-none touch-manipulation">
      {/* 爆米花撒花特效层 (绝对定位在最上层) */}
      {showCelebration && food && !showFoodEasterEgg && (
        <div className="absolute inset-0 pointer-events-none z-50 flex justify-center items-center overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-pop-out"
              style={{
                left: `calc(50% + ${(Math.random() - 0.5) * 150}px)`,
                top: `calc(50% + ${(Math.random() - 0.5) * 100}px)`,
                animationDelay: `${Math.random() * 0.1}s`,
                animationDuration: `${0.6 + Math.random() * 0.4}s`,
              }}
            >
              {getFoodEmoji(food.name)}
            </div>
          ))}
        </div>
      )}

      {/* 背景装饰防溢出 & 防误触 */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-60 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-60 transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      {/* 进度条：取消绝对定位，移入正常文档流防止遮挡刘海屏 */}
      <div className="flex space-x-2 mb-6 z-10 mt-auto sm:mt-0">
        {[0, 1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 w-12 rounded-full transition-all duration-500 ${
              step >= s ? 'bg-orange-400' : 'bg-orange-200'
            }`}
          />
        ))}
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden relative z-10 mb-auto sm:mb-0">
        <div className="p-6 sm:p-8 relative z-10 min-h-[450px] flex flex-col justify-center">
          {/* Step 0: 开场邀请 */}
          {step === 0 && (
            <div className="text-center animate-fade-in">
              <div className="flex justify-center mb-6">
                <Mail className="w-16 h-16 text-orange-400 animate-bounce" />
              </div>
              <h1 className="text-2xl font-bold mb-4 text-gray-800">
                收到一封特别邀请函
              </h1>
              <p className="text-gray-600 mb-8">
                听说有人想一起吃好吃的，近期有空吗？
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-transform transform hover:scale-[1.02] active:scale-95 shadow-md"
                >
                  有空！安排！
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="w-full py-3.5 bg-rose-400 hover:bg-rose-500 text-white font-semibold rounded-xl transition-transform transform hover:scale-[1.02] active:scale-95 shadow-md"
                >
                  必须有空！
                </button>
              </div>
            </div>
          )}

          {/* Step 1: 吃什么 */}
          {step === 1 && (
            <div className="text-center animate-fade-in flex flex-col items-center">
              <Utensils className="w-12 h-12 text-orange-400 mb-4" />
              <h2 className="text-xl font-bold mb-2">
                第一步：解决人生终极难题
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                点击下方按钮，看看今天吃什么好！
              </p>

              {showFoodEasterEgg ? (
                <div className="w-full animate-fade-in mb-6">
                  <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-6 relative overflow-hidden shadow-inner">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-pink-200 rounded-full blur-xl opacity-50"></div>
                    <p className="text-pink-500 font-bold mb-4 flex items-center justify-center text-lg">
                      <Sparkles className="w-5 h-5 mr-2 animate-pulse text-yellow-400" />
                      隐藏彩蛋：获得一次选择权~
                    </p>

                    <input
                      type="text"
                      placeholder="出去吃：想吃什么呢？"
                      value={customFood}
                      onChange={(e) => {
                        setCustomFood(e.target.value);
                        setFanfanCooks(''); // 互斥，清空另一个输入框
                        // 封装成对象，兼容最后生成门票所需的 food.name
                        setFood({ name: e.target.value });
                      }}
                      className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 bg-white outline-none text-gray-700 transition-all text-center placeholder-pink-300"
                      autoFocus
                    />

                    <div className="flex items-center gap-2 my-4 relative z-10">
                      <div className="h-px bg-pink-200 flex-1"></div>
                      <span className="text-xs text-pink-400 font-medium">
                        或者
                      </span>
                      <div className="h-px bg-pink-200 flex-1"></div>
                    </div>

                    <div className="flex items-center relative z-10">
                      <span className="text-pink-500 font-bold mr-2 shrink-0">
                        让翻翻做：
                      </span>
                      <input
                        type="text"
                        placeholder="点一道专属私房菜~"
                        value={fanfanCooks}
                        onChange={(e) => {
                          setFanfanCooks(e.target.value);
                          setCustomFood(''); // 互斥，清空另一个输入框
                          // 在最终门票上自动加上前缀
                          setFood({ name: `翻翻亲手做的 ${e.target.value}` });
                        }}
                        className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 bg-white outline-none text-gray-700 transition-all placeholder-pink-300"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-32 bg-orange-50 rounded-2xl border-2 border-orange-200 flex items-center justify-center p-4 mb-6 transition-all relative overflow-hidden">
                  {/* 增加轮盘转动时的内部流光效果 */}
                  {isRolling && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
                  )}

                  {isRolling ? (
                    <span className="text-xl font-bold text-orange-600 animate-bounce">
                      {foodOptions[currentRollIndex].name}
                    </span>
                  ) : food ? (
                    <div
                      className={`animate-fade-in ${
                        showCelebration
                          ? 'scale-110 transition-transform duration-300'
                          : 'scale-100 transition-transform duration-500'
                      }`}
                    >
                      <p className="text-2xl font-bold text-orange-600 drop-shadow-sm">
                        {food.name}
                      </p>
                    </div>
                  ) : (
                    <span className="text-gray-400">
                      ❓ 未知盲盒等待开启 ❓
                    </span>
                  )}
                </div>
              )}

              {showFoodEasterEgg ? (
                <div className="w-full flex flex-col items-center gap-2">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!customFood.trim() && !fanfanCooks.trim()}
                    className={`w-full py-3.5 font-semibold rounded-xl transition-all shadow-md active:scale-95 ${
                      customFood.trim() || fanfanCooks.trim()
                        ? 'bg-pink-500 hover:bg-pink-600 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    决定啦，下一步！
                  </button>
                  <button
                    onClick={() => {
                      setShowFoodEasterEgg(false);
                      setRedrawCount(0); // 重置次数，重新开始抽
                      startRolling();
                    }}
                    className="text-sm text-gray-400 hover:text-gray-500 underline py-2 active:text-gray-600 transition-colors"
                  >
                    都不想吃，继续抽盲盒
                  </button>
                </div>
              ) : !food || isRolling ? (
                <button
                  onClick={startRolling}
                  disabled={isRolling}
                  className={`w-full py-3 font-semibold rounded-xl text-white shadow-md transition-all ${
                    isRolling
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-orange-500 hover:bg-orange-600 hover:scale-105 active:scale-95'
                  }`}
                >
                  {isRolling ? '轮盘转动中...' : '🎲 抽取今日盲盒'}
                </button>
              ) : (
                <div className="flex gap-2 w-full">
                  <button
                    onClick={handleRedraw}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all active:scale-95"
                  >
                    不太想吃，重抽
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all shadow-md active:scale-95"
                  >
                    就吃这个！
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: 玩什么 */}
          {step === 2 && (
            <div className="text-center animate-fade-in">
              <Sparkles className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
              <h2 className="text-xl font-bold mb-2">第二步：饭后消遣</h2>
              <p className="text-sm text-gray-500 mb-6">
                吃饱喝足，接下来去哪里逛逛呢？
              </p>

              {/* 针对手机屏幕高度进行滚动区域优化 */}
              <div className="grid grid-cols-1 gap-3 mb-2 max-h-[35vh] sm:max-h-52 overflow-y-auto pr-2 custom-scrollbar">
                {activityOptions.map((act, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setActivity(act.name);
                      setCustomActivity('');
                    }}
                    className={`p-3 rounded-xl cursor-pointer border-2 transition-all flex items-center justify-between ${
                      activity === act.name && !customActivity
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-100 bg-gray-50 hover:border-purple-200'
                    } active:scale-[0.98]`}
                  >
                    <span className="font-medium text-gray-700">
                      {act.name}
                    </span>
                    <span className="text-2xl">{act.icon}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 my-3">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-xs text-gray-400 font-medium">
                  或者自己定
                </span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Pencil className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="想去哪儿呢~"
                  value={customActivity}
                  onChange={(e) => {
                    setCustomActivity(e.target.value);
                    setActivity(e.target.value);
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all outline-none text-gray-700 ${
                    customActivity
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-100 bg-gray-50 focus:border-purple-200 focus:bg-white'
                  }`}
                />
              </div>

              <button
                onClick={() => setStep(3)}
                disabled={!activity}
                className={`w-full py-3.5 font-semibold rounded-xl transition-all shadow-md active:scale-95 ${
                  activity
                    ? 'bg-purple-500 hover:bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                下一步：生成凭证
              </button>
            </div>
          )}

          {/* Step 3: 最终凭证 */}
          {step === 3 && (
            <div className="text-center animate-fade-in flex flex-col items-center justify-center">
              <div className="w-full bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl p-6 text-white shadow-lg mb-8 relative overflow-hidden">
                <div className="absolute -left-3 top-1/2 w-6 h-6 bg-white rounded-full transform -translate-y-1/2"></div>
                <div className="absolute -right-3 top-1/2 w-6 h-6 bg-white rounded-full transform -translate-y-1/2"></div>

                <Ticket className="w-10 h-10 mb-4 mx-auto opacity-80" />
                <h2 className="text-2xl font-bold mb-1 tracking-wider">
                  DATE TICKET
                </h2>
                <p className="text-indigo-100 text-xs mb-6">截图发给翻翻生效</p>

                <div className="bg-white/20 rounded-xl p-4 text-left backdrop-blur-sm border border-white/30">
                  <div className="flex items-center mb-3">
                    <Utensils className="w-4 h-4 mr-2 text-indigo-100 shrink-0" />
                    <span className="text-sm font-medium leading-tight">
                      任务一：{food?.name}
                    </span>
                  </div>
                  <div className="flex items-center mb-3">
                    <Sparkles className="w-4 h-4 mr-2 text-indigo-100 shrink-0" />
                    <span className="text-sm font-medium leading-tight">
                      任务二：{activity}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CalendarHeart className="w-4 h-4 mr-2 text-indigo-100 shrink-0" />
                    <span className="text-sm font-medium leading-tight">
                      时间地点：微信详聊 😉
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="text-sm text-gray-400 font-medium hover:text-gray-600 underline active:text-gray-800 p-2"
              >
                重做一次选择
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CSS动画注入 (新增爆米花动画和流光动画) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes popOut {
          0% { opacity: 0; transform: scale(0.1) translateY(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) translateY(-80px) rotate(15deg); }
          100% { opacity: 0; transform: scale(1) translateY(20px) rotate(-10deg); }
        }
        .animate-pop-out {
          animation: popOut ease-out forwards;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1s infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 10px;
        }
      `,
        }}
      />
    </div>
  );
}
