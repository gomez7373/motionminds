.mood-options {
    display: flex;
    gap: 40px;
    margin-top: 30px;
}

.mood-icon {
    width: 100px;
    height: 100px;
    cursor: pointer;
    transition: transform 0.2s, filter 0.3s;
    filter: drop-shadow(0 0 10px #00bcd4); /* Added glow effect to make icons pop */
}

.mood-icon:hover {
    transform: scale(1.2);
    filter: drop-shadow(0 0 15px #00bcd4);
}
