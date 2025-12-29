<script>
      import Wayang1 from "../../assets/wayang1.png";
</script>

<div class="w-96 h-96 top-40 right-24 absolute *:w-96 opacity-50 pointer-events-none">
      <img class="wayang-1 -rotate-15" src={Wayang1} alt="Wayang 1">
</div>

<style>
      .wayang-1 {
            position: absolute;
            top: 0;
            left: 0;
            transform-origin: 50% 50%;
            
            animation-name: wayang-anim;
            animation-duration: 5s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
      }

      @keyframes wayang-anim {
            0% {
                  top: 0;
                  left: 0;
                  transform: rotate(0);
            }
            25% {
                  top: 0px;
                  left: 20px;
            }
            50% {
                  top: -40px;
                  left: 20px;
                  transform: rotate(15deg);
            }
            75% {
                  top: -40px;
                  left: 0;
            }
            100% {
                  top: 0;
                  left: 0;
                  transform: rotate(0);
            }
      }
</style>