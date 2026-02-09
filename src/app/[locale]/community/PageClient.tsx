"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Instagram, Youtube, BookOpen, Calendar, MessageCircle } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useState } from "react";

const faqData = [
    {
        category: "클리어 라식",
        items: [
            { q: "수술 후 7일이 지났는데 흐리게 보여요. 정상적인 현상인가요?", a: "수술 후 흐린 시야는 대부분 각막 붓기로 인해 발생하는 일시적인 현상입니다. 개인차가 있지만, 각막 붓기가 완전히 가라앉는 데는 약 한 달 정도 소요될 수 있습니다. 따라서 현재 흐리게 보이는 것은 회복 과정의 일부이며, 걱정하실 필요는 없습니다. 시간이 지날수록 시야가 점차 선명해지고 한 달이 지나면 보다 더 잘 보실 수 있을 것입니다." },
            { q: "수술 후 세안, 샤워, 목욕탕, 찜질방 이용은 언제부터 가능한가요?", a: "수술 후 세안과 샤워는 다음 날부터 가능합니다. 하지만, 눈에 물이 들어가지 않도록 주의해야 합니다. 목욕탕과 찜질방은 수술 후 1개월 이후부터 이용하는 것이 좋습니다." },
            { q: "요가나 헬스 같은 운동은 언제부터 가능한가요?", a: "요가와 헬스 같은 가벼운 운동은 수술 다음 날부터 가능합니다. 하지만, 무리하지 않는 범위에서 진행해야 합니다. 격렬한 운동이나 접촉이 많은 운동(구기 종목 등)은 수술 후 1개월 이후부터 가능합니다." },
            { q: "자가혈청 안약에 하얀 부유물이 떠다니는데 괜찮은가요?", a: "네, 자가혈청 안약에 하얀 부유물이 떠다니는 것은 정상적인 현상입니다. 자가혈청 안약에는 우리 몸의 혈전을 만드는 성분이 포함되어 있기 때문에, 혈전이 덩어리 형태로 나타나 하얀 부유물처럼 보일 수 있습니다." },
            { q: "자가혈청 안약은 언제까지 사용해야 하나요?", a: "혈청안약은 빠른 회복뿐만 아니라 건조증 치료제로 사용되며 안약이 다 소진될 때까지 사용하시면 됩니다. 혹시라도 추가 처방을 원하실 경우 병원으로 문의부탁드립니다." },
            { q: "수술 후 시력이 뿌옇게 흐려 보이는데 언제쯤 정상으로 돌아올까요?", a: "수술 후 시력이 흐려 보이는 것은 각막 부종으로 인해 발생하는 정상적인 현상입니다. 일반적으로 1~2주 후에는 부종이 감소하여 시력이 점차 개선됩니다." },
            { q: "수술 후 근거리가 아직 덜 보이는데 언제쯤 좋아질까요?", a: "수술 후 근거리 시력이 완전히 회복될 때까지는 약 2주의 적응 기간이 필요합니다. 이 기간 동안에는 눈이 수술 후 변화에 적응하면서 점차 근거리 시력이 개선됩니다." }
        ]
    },
    {
        category: "라식",
        items: [
            { q: "라식 수술 후 눈이 따끔하고 통증이 있어요. 어떻게 해야 하나요?", a: "라식 수술 후 눈이 따끔하고 통증이 느껴지는 것은 정상적인 현상입니다. 일반적으로 수술 후 6시간 동안 눈물이 많이 나고 시릴 수 있으며, 1~2일 후에는 증상이 점차 완화됩니다. 눈을 비비지 않도록 주의해 주세요." },
            { q: "라식 수술 후 집에 돌아와 보니 보호렌즈가 빠져 있었어요. 어떻게 해야 하나요?", a: "라식 수술 후 보호렌즈가 빠져도 걱정하지 않으셔도 됩니다. 라식 수술의 경우, 보호렌즈는 주로 통증 완화와 눈 건조함 예방을 위해 삽입하며, 시력 회복에는 큰 영향을 미치지 않습니다." },
            { q: "자가혈청 안약에 하얀 부유물이 떠다니는데 괜찮은가요?", a: "네, 자가혈청 안약에 하얀 부유물이 떠다니는 것은 정상적인 현상입니다. 자가혈청 안약에는 우리 몸의 혈전을 만드는 성분이 포함되어 있기 때문에, 혈전이 덩어리 형태로 나타나 하얀 부유물처럼 보일 수 있습니다." },
            { q: "자가혈청 안약은 언제까지 사용해야 하나요?", a: "혈청안약은 빠른 회복뿐만 아니라 건조증 치료제로 사용되며 안약이 다 소진될 때까지 사용하시면 됩니다. 혹시라도 추가 처방을 원하실 경우 병원으로 문의부탁드립니다." },
            { q: "수술 후 모니터를 보면서 일을 해야 하는데 빛 번짐이 심해서 어려움을 겪고 있어요. 어떻게 해야 할까요?", a: "라식 수술 후 빛 번짐은 정상적인 현상입니다. 시력이 안정화되는 기간은 약 1개월이며, 근거리 시력은 그 중에서도 가장 늦게 회복됩니다. 따라서, 수술 후 1개월 동안은 빛 번짐이 심하게 나타날 수 있습니다." },
            { q: "라식 수술 후에도 자외선 차단이 필요한가요?", a: "과거에 비해 자외선 차단의 중요성이 다소 낮아졌습니다. 특히, 절편이 덮이는 라식 수술 방법의 경우에는 각막 상피가 빠르게 회복되고 자외선 차단 효과도 높기 때문에, 반드시 자외선 차단을 해야 하는 것은 아닙니다." },
            { q: "라식 수술 후 시력이 뿌옇게 흐려 보이는데 언제쯤 정상으로 돌아올까요?", a: "수술 후 시력이 흐려 보이는 것은 각막 부종으로 인해 발생하는 정상적인 현상입니다. 일반적으로 1~2주 후에는 부종이 감소하여 시력이 점차 개선됩니다." },
            { q: "라식 수술 후 아침에 일어났을 때 시야가 뿌옇게 보이다가 시간이 지나면 괜찮아지는 이유는 무엇인가요?", a: "라식 수술 후 아침에 시야가 뿌옇게 보이는 것은 건조증 때문일 가능성이 높습니다. 수술 후 각막 상피가 회복되는 과정에서 눈물 분비가 감소하여 건조증이 발생할 수 있으며, 이는 아침에 가장 심하게 나타날 수 있습니다." },
            { q: "라식 수술 후 다음 날부터 컴퓨터와 스마트폰을 마음껏 사용해도 되나요?", a: "라식 수술 후 다음 날부터 컴퓨터와 스마트폰을 일상생활에서 사용하는 것은 가능합니다. 하지만 눈에 무리가지 않게끔 중간에 휴식을 취하며, 인공눈물을 점안하여 건조해지지 않도록 관리해주셔야합니다." }
        ]
    },
    {
        category: "라섹",
        items: [
            { q: "라섹 수술 후 4일째인데도 아직 통증이 있어 걱정됩니다. 정상적인 현상일까요?", a: "라섹 수술 후 2~3일째 가장 통증이 심하고, 4일째부터 통증이 점차 가라앉기 시작할겁니다. 하지만, 개인의 건강 상태, 수술 방법, 회복 속도 등에 따라 통증이 지속되는 기간은 다를 수 있습니다." },
            { q: "라섹 수술 후 4일째인데 수술 직후보다 시력이 더 안보이는 것 같아 걱정됩니다.", a: "라섹 수술 후 4일째 시력이 더 안보이는 것은 각막 상피 회복 과정으로 인해 발생하는 일시적인 현상입니다. 수술 후 3~7일 사이에는 각막 상피가 중앙으로 모이는 과정에서 시력이 흐릿하게 보일 수 있습니다." },
            { q: "라섹 수술 후 한 달째인데 시력이 여전히 흐릿하게 보이는 이유가 무엇일까요?", a: "라섹 수술 후 시력이 완전히 안정화되는데는 개인차가 있으며, 일반적으로 3개월까지 소요됩니다. 고도 근시나 고도 난시의 경우 시력 회복 기간이 더 길어질 수 있으며, 6개월까지 지속될 수 있습니다." },
            { q: "라섹 수술 후 후루손 안약은 언제부터 사용해야 하나요? 그리고 하루에 몇 번 사용해야 하고, 사용 기간은 얼마나 되나요?", a: "후루손 안약은 라섹 수술 후 렌즈를 제거하는 즉시 사용해야 합니다. 하루에 4번 아침, 점심, 저녁, 잠자리에 들기 전에 각각 한 방울씩 점안합니다. 안약은 약 3개월간 점안해야되며 안과 전문의의 지시에 따라 사용 기간이 다를 수 있습니다." },
            { q: "자가혈청 안약에 하얀 부유물이 떠다니는데 괜찮은가요?", a: "네, 자가혈청 안약에 하얀 부유물이 떠다니는 것은 정상적인 현상입니다. 자가혈청 안약에는 우리 몸의 혈전을 만드는 성분이 포함되어 있기 때문에, 혈전이 덩어리 형태로 나타나 하얀 부유물처럼 보일 수 있습니다." },
            { q: "자가혈청 안약은 언제까지 사용해야 하나요?", a: "혈청안약은 빠른 회복뿐만 아니라 건조증 치료제로 사용되며 안약이 다 소진될 때까지 사용하시면 됩니다. 혹시라도 추가 처방을 원하실 경우 병원으로 문의부탁드립니다." },
            { q: "라섹 후 실내에서도 UV 차단 안경이나 선글라스를 착용해야 할까요?", a: "라섹 후 실내에서 LED 차단을 위해 UV 차단 안경이나 선글라스를 착용할 필요는 없습니다. 외출 시에는 UV 차단 기능이 있는 선글라스를 착용합니다. UV 차단율 99% 이상인 선글라스를 선택하는 것이 좋습니다." },
            { q: "라섹 수술 후 밤에 운전을 해야 하는데 언제부터 가능할까요? 지금은 눈부심 때문에 운전하기 어렵습니다.", a: "라섹 수술 후 야간 운전은 개인차가 있지만, 일반적으로 1~3개월 이후부터 가능합니다. 초반에는 빛번짐이 있기에 야간 운전을 피하는 것이 좋으며, 주간운전부터 시작하여 천천히 적응하여 1~3개월 이후 야간운전을 권장드립니다." }
        ]
    },
    {
        category: "렌즈삽입술",
        items: [
            { q: "렌즈삽입술 후 6개월 정도 되었는데 정기검진이 필요할까요?", a: "네, 렌즈삽입술 후 6개월이 지났더라도 정기검진은 필수입니다. 눈 안에 렌즈가 삽입되어 있기에 각막 내피세포 수가 감소할 수 있으며, 정기검진을 통해 각막 내피세포 수를 확인하고, 감소가 있는지 여부를 파악해야 합니다." },
            { q: "렌즈삽입술 후 목욕탕이나 찜질방은 언제부터 이용할 수 있나요?", a: "렌즈삽입술 후 목욕탕이나 찜질방은 일반적으로 1개월 이후부터 이용 가능합니다. 하지만, 개인의 눈 건강 상태나 수술 결과에 따라 이용 가능 시기가 달라질 수 있습니다." },
            { q: "세안이나 샤워는 언제부터 가능한가요?", a: "세안과 샤워는 일반적으로 3일 이후부터 가능합니다. 3일 이내에는 눈에 물이 들어가지 않도록 주의해야 합니다. 세안은 눈을 빼고 나머지 얼굴만 닦아야 합니다." },
            { q: "렌즈삽입술 후 엎드려 자는 자세가 괜찮을까요?", a: "렌즈삽입술 후 최소 한 달 동안은 엎드려 자는 자세를 피하는 것이 좋습니다. 엎드려 자는 자세는 안압 상승을 유발할 수 있으며, 이는 렌즈삽입술 후 회복에 악영향을 미칠 수 있습니다." },
            { q: "안대는 얼마나 착용해야하나요?", a: "취침 중 실수로 눈을 비비게 될 경우 렌즈가 눈 안에서 자리를 잡는데 방해가 될 수 있으며, 수술 부위 손상을 예방하기 위해 일반적으로 2주정도 안대를 착용하길 권장드립니다." }
        ]
    },
    {
        category: "백내장",
        items: [
            { q: "백내장 수술 후 뿌옇게 보이는 증상은 언제쯤 좋아질까요?", a: "백내장 수술 후 뿌옇게 보이는 증상은 개인차가 있지만, 일반적으로 3~6개월 이내에 좋아집니다. 수술 후 1~2개월 동안은 인공수정체에 적응하며 시력이 점차 좋아지기 시작합니다." },
            { q: "친구는 수술 후 바로 잘 보였는데, 제가 잘 안 보이는 이유는 무엇인가요?", a: "백내장 수술 후 시력 회복 속도는 개인마다 다릅니다. 친구분과 비교하기보다는 자신의 눈 상태에 집중하고 안과 전문의의 지시를 따르는 것이 중요합니다." },
            { q: "백내장 수술 후 눈이 불편해서 걱정됩니다.", a: "백내장 수술 후 눈 불편함은 대부분 정상적인 현상입니다. 마취가 풀리고 눈이 회복되는 과정에서 발생하며, 시간이 지나면서 점차 완화됩니다." },
            { q: "백내장 수술은 재발 가능성이 없나요?", a: "백내장 수술 자체는 재발 가능성이 매우 낮습니다. 하지만, 후발성 백내장이라는 개념이 있습니다. 후발성 백내장은 수술 후 남아있는 후낭이라는 부분에 막이 생기는 것을 말하며, 레이저 치료로 간단하게 제거할 수 있습니다." },
            { q: "어제 백내장 수술을 했는데 충혈이 심해서 걱정됩니다.", a: "수술 시 긴장하면 눈에 힘이 들어가 충혈이 발생할 수 있습니다. 백내장 수술 후 충혈은 대부분 일시적인 현상이며, 시간이 지나면서 개선됩니다. 대부분의 경우 수술 후 2주에서 1개월 정도 지나면 충혈이 자연스럽게 소멸됩니다." },
            { q: "백내장 수술 후 눈이 떨리는 증상이 나타났습니다.", a: "수술 후 눈이 떨리는 증상은 건조증 및 빛 번짐 현상과 더불어 렌즈가 자리를 잡기 위한 적응 증상입니다. 대부분의 경우 눈 떨림 증상은 시간이 지나면서 개선됩니다." }
        ]
    },
    {
        category: "익상편",
        items: [
            { q: "익상편 수술 후 충혈이 심해서 걱정됩니다. 언제쯤 좋아질까요?", a: "수술 후 회복하는 과정 중 이물감과 충혈이 생길 수 있으며 대부분 2개월 이내에 자연스럽게 좋아집니다. 이는 일시적인 현상이며, 시간이 지나면서 충혈이 완화되고 눈 건강이 회복될 것입니다." },
            { q: "익상편 수술 당일 운전해도 될까요?", a: "익상편 수술 당일 운전은 권장하지 않습니다. 안전을 위해 수술 후 2~3일 정도는 운전을 피하는 것이 좋습니다. 2~3일 이후 눈 상태가 편해지고 시력이 회복되었다고 느껴지면 운전을 해도 됩니다." },
            { q: "익상편 수술 당일 눈시림이 심해서 걱정됩니다. 괜찮을까요?", a: "익상편 수술 후 눈시림은 대부분 정상적인 현상입니다. 수술 과정에서 눈에 자극이 가해져 시림, 흐릿한 시야, 이물감 등의 불편함을 느낄 수 있습니다. 대부분의 경우 눈시림은 하루 정도 지나면 개선됩니다." },
            { q: "익상편 수술 후 수술 부위가 울퉁불퉁하고 군날개가 남아있는 것 같아 걱정됩니다.", a: "익상편이 있던 자리는 오래될수록 깊이 혼탁이 진행되어 수술 후에도 약간 하얗게 침착될 수 있습니다. 대부분의 경우 울퉁불퉁함과 군날개는 2개월 정도 지나면 개선됩니다." },
            { q: "익상편 수술 후 세안이나 샤워는 언제부터 가능할까요?", a: "세안과 샤워는 일반적으로 3일 이후부터 가능합니다. 3일 이내에는 눈에 물이 들어가지 않도록 주의해야 합니다. 세안은 눈을 빼고 나머지 얼굴만 닦아야 합니다." },
            { q: "익상편 수술 후 언제부터 운동을 해도 될까요?", a: "익상편 수술 후 운동 가능 시기는 운동 유형에 따라 다릅니다. 가벼운 유산소 운동은 수술 후 1주일 이후부터 가능합니다. 접촉이 많거나 격렬한 운동은 수술 후 1개월 이후부터 가능합니다." }
        ]
    },
    {
        category: "망막",
        items: [
            { q: "망막 수술 당일 눈이 잘 안 떠지고 겹쳐 보이는데 괜찮을까요?", a: "수술 후 회복 과정 동안 당일은 마취때문에 눈이 잘 안떠지고 겹쳐보일 수 있습니다. 이는 일시적인 현상이며 24시간 이내에 개선되기 시작합니다." },
            { q: "망막 수술 후 회복 기간은 얼마나 걸리나요?", a: "망막 수술 후 회복 기간은 개인차가 있지만, 일반적으로 수술 후 1개월은 시야가 흐릿하고 뿌옇게 보일 수 있습니다. 1년에서 1년 반 정도까지 시야가 완전히 회복될 수 있습니다." },
            { q: "망막 수술 후 안대를 떼고 안약을 어떻게 사용해야 할까요?", a: "수술 다음 날 아침에 안대를 직접 제거하면 됩니다. 설명드린 안약을 5분 간격으로 점안 후 병원에 꼭 방문하여 수술에 대한 경과 관찰을 받아야 합니다. 항생제, 소염제 안약은 하루 4회 한달동안 사용하며, 브롬펜 안약은 하루2회 사용해주세요." },
            { q: "망막수술 후 내원은 언제 하나요?", a: "수술 다음 날 수술 후 경과 관찰을 위해 병원에 방문해야 합니다. 1주일 후 수술 부위 상태 확인을 위해 내원합니다. 1개월 후, 2개월 후 내원이 필요합니다. 이후로는 1년마다 건강검진 차원에서 눈 경과 관찰을 위해 내원합니다." },
            { q: "망막 수술 후 언제부터 운전을 해도 될까요?", a: "낮 운전은 1주일 이후부터 가능하며, 밤 운전은 1개월 이후부터 가능합니다. 수술 후 상황에 따라 위험하지 않은 선에서 운전하여도 무방합니다." },
            { q: "망막 수술 후 안약을 사용했는데 눈이 많이 따가워요. 괜찮을까요?", a: "망막 수술 후 염증 방지를 위해 처방된 안약은 성분이 세기 때문에 눈이 조금 따가울 수 있습니다. 따가움은 정상적인 반응이며, 시간이 지나면서 점차 완화됩니다." }
        ]
    }
];

function FAQSection() {
    const [activeTab, setActiveTab] = useState(0);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div>
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3 mb-10">
                {faqData.map((category, idx) => (
                    <button
                        key={idx}
                        onClick={() => { setActiveTab(idx); setOpenIndex(0); }}
                        className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all ${
                            activeTab === idx
                                ? 'bg-primary text-black'
                                : 'bg-neutral-900/50 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-white/10'
                        }`}
                    >
                        {category.category}
                    </button>
                ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
                {faqData[activeTab].items.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-neutral-900/30 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-colors"
                    >
                        <div
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="flex justify-between items-start p-4 sm:p-5 md:p-8 cursor-pointer group"
                        >
                            <div className="flex gap-4 items-start flex-1">
                                <span className="text-primary font-bold text-xl shrink-0">Q.</span>
                                <h3 className={`text-base sm:text-lg font-bold leading-relaxed transition-colors ${openIndex === i ? 'text-primary' : 'text-white group-hover:text-primary'}`}>
                                    {item.q}
                                </h3>
                            </div>
                            <Plus className={`text-white/20 group-hover:text-primary transition-all duration-300 shrink-0 ${openIndex === i ? 'rotate-45 text-primary' : ''}`} size={24} />
                        </div>
                        {openIndex === i && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="px-4 sm:px-5 md:px-8 pb-4 sm:pb-5 md:pb-8"
                            >
                                <div className="pl-10 pt-4 border-t border-white/5">
                                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                                        {item.a}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default function CommunityPageClient() {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-background text-foreground">
            <div className="container mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-16 sm:mb-20 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-green-500 text-xs sm:text-sm font-bold tracking-widest uppercase">Live Support</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black text-white">
                            HEALING <br /> COMMUNITY
                        </h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mt-6 sm:mt-8 md:mt-0 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
                    >
                        <Button size="lg" className="rounded-full px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg bg-neutral-800 hover:bg-neutral-700 text-white">수술 후기 보러가기</Button>
                        <Button size="lg" className="rounded-full px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg bg-primary text-black hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">실시간 예약하기</Button>
                    </motion.div>
                </div>

                {/* Notices & Events */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 sm:mb-20 md:mb-32">
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-primary block" /> 공지사항 & 이벤트
                        </h2>
                        <div className="space-y-4">
                            {[
                                { title: "2024년 설 연휴 진료 안내", date: "2024.01.15", tag: "공지" },
                                { title: "수험생 대상 스마일라식 최대 49% 할인 이벤트", date: "2024.01.01", tag: "이벤트" },
                                { title: "힐링안과 누적 수술 5만안 달성 기념", date: "2023.12.10", tag: "소식" }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-6 bg-neutral-900/50 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-primary/20 transition-all cursor-pointer group">
                                    <div>
                                        <span className="text-xs font-bold text-primary border border-primary/30 px-2 py-1 rounded mb-2 inline-block mr-3">{item.tag}</span>
                                        <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors inline">{item.title}</h3>
                                    </div>
                                    <span className="text-neutral-500 text-sm">{item.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social Media Cards */}
                    <div className="md:col-span-1 space-y-4">
                        {/* Instagram */}
                        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-[2rem] p-8 border border-white/10 relative overflow-hidden group hover:border-white/30 transition-all cursor-pointer"
                            onClick={() => window.open('https://www.instagram.com/healingeyeclinic/', '_blank')}>
                            <div className="absolute top-0 right-0 p-8 text-neutral-500 group-hover:text-white transition-colors">
                                <Instagram size={32} />
                            </div>
                            <div className="mt-8">
                                <span className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-2 block">Instagram</span>
                                <h3 className="text-3xl font-bold text-white mb-2">@healingeyeclinic</h3>
                                <p className="text-neutral-400 text-sm mb-4">힐링안과 일상과 수술 후기</p>
                                <Button
                                    variant="link"
                                    className="text-white p-0 hover:text-primary"
                                >
                                    바로가기 &rarr;
                                </Button>
                            </div>
                        </div>

                        {/* YouTube */}
                        <div className="bg-gradient-to-br from-red-900/20 to-rose-900/20 rounded-[2rem] p-8 border border-white/10 relative overflow-hidden group hover:border-white/30 transition-all cursor-pointer"
                            onClick={() => window.open('https://www.youtube.com/@dreyesis', '_blank')}>
                            <div className="absolute top-0 right-0 p-8 text-neutral-500 group-hover:text-white transition-colors">
                                <Youtube size={32} />
                            </div>
                            <div className="mt-8">
                                <span className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-2 block">YouTube</span>
                                <h3 className="text-3xl font-bold text-white mb-2">안과언니</h3>
                                <p className="text-neutral-400 text-sm mb-4">@dreyesis 눈 건강 정보</p>
                                <Button
                                    variant="link"
                                    className="text-white p-0 hover:text-primary"
                                >
                                    바로가기 &rarr;
                                </Button>
                            </div>
                        </div>

                        {/* Naver Blog */}
                        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-[2rem] p-8 border border-white/10 relative overflow-hidden group hover:border-white/30 transition-all cursor-pointer"
                            onClick={() => window.open('https://blog.naver.com/wpsjtltmals7', '_blank')}>
                            <div className="absolute top-0 right-0 p-8 text-neutral-500 group-hover:text-white transition-colors">
                                <BookOpen size={32} />
                            </div>
                            <div className="mt-8">
                                <span className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-2 block">Naver Blog</span>
                                <h3 className="text-3xl font-bold text-white mb-2">힐링안과</h3>
                                <p className="text-neutral-400 text-sm mb-4">전문 칼럼과 의료 정보</p>
                                <Button
                                    variant="link"
                                    className="text-white p-0 hover:text-primary"
                                >
                                    바로가기 &rarr;
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ - Accordion Style with Tabs */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-primary block" /> 자주 묻는 질문 (FAQ)
                    </h2>

                    <FAQSection />
                </div>

            </div>
        </div>
    );
}
