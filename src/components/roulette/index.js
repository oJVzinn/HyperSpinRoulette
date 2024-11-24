import React, { useEffect } from "react";
import styles from "./Roulette.module.css";
import Container from "../container";

const prizes = [
    "Gamepass Ultimate",
    "Steam R$10",
    "Steam R$100",
    "Discord Nitro",
    "Discord Nitro Classic",
    "Discord Nitro Classic",
    "Spotify Premium",
    "Mundo Gamer R$100",
];

let isRolling = false

export default function Roulette() {
    useEffect(() => {
        const prizeElements = document.querySelectorAll(`.${styles.slice}`);
        prizeElements.forEach((prize, index) => {
            const angle = (360 / prizes.length) * index;
            prize.style.transform = `rotate(${angle}deg)`;
        });

        const prizeName = document.querySelectorAll(`.${styles.prizeText}`);
        prizeName.forEach((prize, index) => {
            prize.style.transform = `rotate(70deg)`;
        })
    }, []);

    function spinRoulette(spin, max) {
        if (spin > max) {
            let prizeContainer = null;
            document.querySelectorAll(`.${styles.slice}`).forEach((elements) => {
                const style = window.getComputedStyle(elements);
                const transform = style.transform;
                const values = transform.match(/matrix\((.*)\)/)[1].split(', ');
                const a = parseFloat(values[0]);
                const b = parseFloat(values[1]);
                const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
                if (angle === 20) {
                    prizeContainer = elements
                }
                elements.querySelectorAll(`.${styles.prizeText}`).forEach((element) => {
                    console.log(`O prêmio sorteado foi :${element.textContent + ":" + angle}`)
                })
            });


            prizeContainer.querySelectorAll(`.${styles.prizeText}`).forEach((element) => {
                window.alert(`O prêmio sorteado foi: ${element.textContent}!`)
                isRolling = false
            })
            return
        }

        isRolling = true
        const prizeElements = document.querySelectorAll(`.${styles.slice}`);
        const totalElements = prizeElements.length; // Número total de prêmios

        prizeElements.forEach((prize, index) => {
            prize.style.transition = "transform 1s ease-in-out";
            const currentAngle = (360 / totalElements) * index + 65;
            const nextAngle = currentAngle + (360 / totalElements) * spin;
            prize.style.transform = `rotate(${nextAngle}deg)`;
        });
        
        setTimeout(() => {
            spinRoulette(spin + 1, max);
        }, 1000);
    }

    return (
        <Container>
            <div className={styles.container}>
                <img src="./assets/wolkeIcon.png" alt="wolkeIcon" className={styles.wolkeIcon}/>
                <img alt="arrow" src="./assets/arrow.png" className={styles.arrowPrize}/>
                <div className={styles.roulette}>
                    {prizes.map((value, index) => (
                        <div
                            key={index}
                            className={styles.slice}
                            style={{
                                backgroundColor: index % 2 === 0 ? "#302c34" : "#304FFE",
                            }}
                        >
                            <span className={styles.prizeText}>{value}</span>
                        </div>
                    ))}
                </div>
                <button className={styles.spinRoulette} onClick={() => {
                    if (isRolling) {
                        return
                    }

                    spinRoulette(0, (Math.floor(Math.random() * 20)) + 5);
                }}>Girar Roleta
                </button>
            </div>
        </Container>
    );
}
