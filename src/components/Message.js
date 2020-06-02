import React from 'react';
import styles from '../styles/message.module.css'
import {dateFormatter} from "../utils/miscFunctions";
import Icon from "@mdi/react";
import {mdiIncognito, mdiArrowUpBold, mdiArrowDownBold, mdiFlagRemove, mdiArrowRightBold} from "@mdi/js";

const Message = ({msg}) => {
    return (
        <li className={styles.messageContainer}>

            <div className={styles.messageTopper}>
                {
                    msg.anonymous ?
                        <Icon path={mdiIncognito} size={1} color={'#9e0b66'}/> :
                        <p className={styles.messageUser}>{msg.user}</p>
                }
                <p className={styles.messageTime}>{dateFormatter(msg.originalTime)}</p>
                <div className={styles.voteContainer}>
                    <Icon path={mdiArrowUpBold} size={1} className={styles.upIcon}/>
                    {msg.upVotes !== 0 ? <p className={styles.upVoteCount}>{msg.upVotes}</p> : null}
                    <Icon path={mdiArrowDownBold} size={1} className={styles.downFlagIcon}/>
                    <Icon path={mdiFlagRemove} size={1} className={styles.downFlagIcon}/>
                </div>
            </div>
            <hr style={{margin: '0 0 0 0'}}/>
            <div className={styles.locNameContainer}>
                <div className={styles.locationText}>{msg.fromLoc} </div>
                {msg.fromLocID === msg.owner ?
                    <div className={styles.ownerText}> · Owner</div> : null}
                {msg.toLocID ? <>
                    <Icon path={mdiArrowRightBold} size={1} className={styles.locArrow}/>
                    <div className={styles.locationText}>{msg.toLoc} </div>
                    {msg.toLocID === msg.owner ?
                        <div className={styles.ownerText}> · Owner</div> : null}
                </> : null}
            </div>
            <div className={styles.messageContent}>
                {msg.content}
            </div>
        </li>
    );
};

export default Message;