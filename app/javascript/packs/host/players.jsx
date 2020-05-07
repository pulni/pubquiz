import React from 'react';
import styled from 'styled-components';
import { Button, Modal, Tooltip } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { PlayerAvatarName, PlayerBadge, PlayerName } from './components';

const { confirm } = Modal;

const Container = styled.div`
  @media (min-width: 575px) {
    border-right: 1px solid #eee;
  }
  height: 100%;
`;

const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const PlayerScore = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  color: #999;
  font-style: italic;
  text-align: right;
`;

const PlayerActions = styled.div`
  margin-right: 10px;
`;

const Player = ({ player, removePlayer, score }) => (
  <PlayerContainer>
    <PlayerAvatarName>
      <PlayerBadge player={player} />
      <PlayerName>{player.player_name}</PlayerName>
      <PlayerScore>{score}</PlayerScore>
    </PlayerAvatarName>
    <PlayerActions>
      <Tooltip title="Remove">
        <Button
          type="link"
          shape="circle"
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => confirm({
            title: 'Remove player?',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to remove this player?',
            onOk() { removePlayer(player.player_id) },
            onCancel() {},
          })}
        />
      </Tooltip>
    </PlayerActions>
  </PlayerContainer>
);

const Players = ({ players, removePlayer, score }) => {
  function scoreFor(playerId) {
    const playerScore = score.find(item => item.player_id === playerId);
    return playerScore ? playerScore.score : 0;
  }

  return (
    <Container>
      <h3>Players</h3>
      {players.sort((a,b) => a.player_name.localeCompare(b.player_name)).map(player => (
        <Player
          key={player.player_id}
          player={player}
          score={scoreFor(player.player_id)}
          removePlayer={removePlayer}
        />
      ))}
    </Container>
  );
};

export default Players;
