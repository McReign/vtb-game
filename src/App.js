import React, { useState } from 'react';
import { Board } from './components/Board';
import { Character } from './components/Character';
import { CHARACTERS } from './constants/characters';
import { getBoardByDepartment } from './utils/getBoardByDepartment';
import { getInitialCharactersState } from './utils/getInitialCharactersState';
import { getFieldIndexByFieldId } from './utils/getFieldIndexByFieldId';
import { getFieldIdByPosition } from './utils/getFieldIdByPosition';
import styles from './App.module.scss';

function App() {
  const [department, setDepartment] = useState('RETAIL_DEPARTMENT');
  const board = getBoardByDepartment(department);
  const [charactersState, setCharactersState] = useState(getInitialCharactersState(CHARACTERS, board));

  function handleActivateCharacter(characterId) {
    setCharactersState((prev) => ({ ...prev, [characterId]: { ...prev[characterId], active: true } }));
  }

  function handleSkillsAmountChange(characterId, skillsAmount) {
    setCharactersState((prev) => ({ ...prev, [characterId]: { ...prev[characterId], skillsAmount } }));
  }

  function handleCharacterMove(characterId, steps) {
    const characterFieldId = charactersState[characterId].fieldId;
    const fieldIndex = getFieldIndexByFieldId(characterFieldId, board);
    const newFieldId = getFieldIdByPosition(board.path[fieldIndex + steps], board);

    setCharactersState((prev) => ({ ...prev, [characterId]: { ...prev[characterId], fieldId: newFieldId } }));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.characters}>
        {CHARACTERS.map((character) => (
          <Character
            key={character.id}
            {...character}
            {...charactersState[character.id]}
            onMove={(steps) => handleCharacterMove(character.id, steps)}
            onSkillsAmountChange={(amount) => handleSkillsAmountChange(character.id, amount)}
            onActivate={() => handleActivateCharacter(character.id)}
          />
        ))}
      </div>
      <Board className={styles.board} board={board} characters={CHARACTERS} charactersState={charactersState} />
    </div>
  );
}

export default App;
