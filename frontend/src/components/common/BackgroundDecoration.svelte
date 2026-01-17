<script lang="ts">
        import CurtainLeft from "../../assets/materials/curtain-left.webp";
        import CurtainRight from "../../assets/materials/curtain-right.webp";
        import BackgroundMark from "../../assets/materials/bg-mark.webp";
        import Batik from "../../assets/materials/batik.webp";
        import Pillar from "../../assets/materials/pillar.webp";
        import Stage from "../../assets/materials/stage.webp";
</script>

<div class="top-0 left-0 fixed w-dvw h-dvh opacity-85 pointer-events-none -z-10">
        <img class="absolute h-full md:h-full top-0 -left-50 md:-left-25 scale-x-50 scale-y-110 md:scale-x-80" src={CurtainLeft} alt="Curtain Left">
        <img class="absolute top-1/2 left-1/2 -translate-1/2 opacity-80" src={BackgroundMark} alt="Curtain Left">
        <img class="absolute h-full md:h-full top-0 -right-50 md:-right-25 scale-x-50 scale-y-110 md:scale-x-80" src={CurtainRight} alt="Curtain Left">
        <img class="absolute -bottom-20 -left-30 scale-75 -z-5" src={Batik} alt="">
        <img class="absolute -top-20 -right-20 scale-50 -z-5" src={Batik} alt="">
        <img class="absolute h-full -left-100 -z-10 scale-x-90" src={Pillar} alt="">
        <img class="absolute h-full -right-100 -z-10 scale-x-90" src={Pillar} alt="">
        <img class="absolute w-full bottom-0 left-1/2 -translate-x-1/2 -z-10 opacity-50" src={Stage} alt="">
        <div class="absolute w-[200%] aspect-square bottom-0 left-0 -translate-x-1/2 translate-y-1/2 bg-radial from-yellow-400 to-transparent from-10% to-40% opacity-50 -z-100"></div>
        <div class="absolute w-[80%] aspect-square -bottom-full left-1/2 -translate-x-1/2 bg-radial from-white to-transparent from-0% to-70% opacity-50 -z-100"></div>
</div>
