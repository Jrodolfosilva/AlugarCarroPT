import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <section className={styles.containerHome}>
      <div className={styles.containerHome_banner}></div>
      <div className={styles.containerHome_filter}>
          <div>
            <form action="">
              <section>
                <div>
                  <label htmlFor="">
                    <span>Marca</span>
                    <select name="marca" id="marca">
                      <option value="">Fiat</option>
                      <option value="">Renault</option>
                      <option value="">Kia</option>
                      <option value="">Ford</option>
                      <option value="">Hyndai</option>
                    </select>
                  </label>
                  <label htmlFor="">
                    <span>Modelo</span>
                    <select name="marca" id="marca">
                        <option value="">Fiat</option>
                        <option value="">Renault</option>
                        <option value="">Kia</option>
                        <option value="">Ford</option>
                        <option value="">Hyndai</option>
                    </select>
                  </label>
                  <label htmlFor="">
                    <span>Retirada</span>
                    <input type="date" name="retirada" id="retirada" />
                  </label>
                  <label htmlFor="">

                  <input type="date" name="devolucao" id="devolucao" />
                  </label>
                </div>
                <div>
                  <Image src={"/chaves.png"} width={50} height={60} alt=""/>
                  <div>
                  <h3>Apresente sua carta de condução válida para alugar um veículo!</h3>
                  <p>É obrigatório apresentar a carta de condução regularizada no momento da retirada do carro.</p>
                  </div>
                </div>
              </section>
              <section>
                <p>
                  <Image
                    src={"/alert.png"}
                    width={40}
                    height={40}
                    quality={100}
                    alt=""
                  />
                  A retirada do veículo é feita exclusivamente 
                  na nossa loja física em Lisboa.
                </p>
                <input type="submit" value="Continuar" />

              </section>
            </form>
          </div>
      </div>
      <div className={styles.containerHome_about}>
        <h2>Sobre nosso serviço</h2>
        <p>É obrigatório apresentar a carta de condução regularizada no
           momento da retirada do carro.É obrigatório apresentar
           a carta de condução regularizada no momento da retirada do
            carro.É obrigatório apresentar a carta de condução 
            regularizada no momento da retirada do carro.É obrigatório apresentar a carta de condução 
            regularizada no momento da retirada do carro.É obrigatório apresentar a carta de condução 
            regularizada no momento da retirada do carro.</p>
            <p>É obrigatório apresentar a carta de condução regularizada no
           momento da retirada do carro.É obrigatório apresentar
           a carta de condução regularizada no momento da retirada do
            carro.É obrigatório apresentar a carta de condução 
            regularizada no momento da retirada do carro.É obrigatório apresentar a carta de condução 
            regularizada no momento da retirada do carro.É obrigatório apresentar a carta de condução 
            regularizada no momento da retirada do carro.</p>
      </div>
    </section>
  );
}
