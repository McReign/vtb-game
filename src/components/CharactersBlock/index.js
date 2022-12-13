import React, { Fragment } from 'react';
import cn from 'classnames';
import { Character } from '../Character';
import { CharacterState } from '../CharacterState';
import styles from './index.module.scss';

export function CharactersBlock(props) {
  const {
    className,
    gameCompleted,
    characters,
    charactersState,
    onActivate,
    onSkillsAmountChange,
    onMove,
    onUseSuperpower,
    onOpenCharacter,
  } = props;

  return (
    <div className={cn(styles.wrapper, className)}>
      {characters?.map((character) => (
        <Fragment key={character?.id}>
          <Character
            character={character}
            characterState={charactersState?.[character?.id]}
            gameCompleted={gameCompleted}
            onActivate={() => onActivate?.(character?.id)}
            onUseSuperpower={() => onUseSuperpower?.(character?.id)}
            onOpen={() => onOpenCharacter?.(character?.id)}
          />
          <CharacterState
            character={character}
            characterState={charactersState?.[character?.id]}
            gameCompleted={gameCompleted}
            onActivate={() => onActivate?.(character?.id)}
            onSkillsAmountChange={(value) => onSkillsAmountChange?.(character?.id, value)}
            onMove={(steps) => onMove?.(character?.id, steps)}
            onOpen={() => onOpenCharacter?.(character?.id)}
          />
        </Fragment>
      ))}
    </div>
  );
}
