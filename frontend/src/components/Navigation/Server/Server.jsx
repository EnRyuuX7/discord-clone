import React from 'react'
import styles from './Server.module.scss'

const Server = () => {
    return (
        <div className={styles.server_list}>
            <div className={styles.server}>
                <div className={styles.server__home}>
                    <div className={styles.server__icon}>
                        <img src='home.png' />
                        <div className={styles.server__pop}>
                            Home
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.divider}></div>
        </div>
    )
}

export default Server