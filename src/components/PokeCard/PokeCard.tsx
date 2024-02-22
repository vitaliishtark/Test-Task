import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { moveData } from '../../store/pokemon.slice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './PokeCard.module.scss'
type PokeCardProps = {
  data: any,
  className?: string;
}

export const PokeCard: React.FC<PokeCardProps> = ({ data, className }) => {
  const dispatch = useDispatch();
  const handleCardClick = () => {
    dispatch(moveData(data));
  };
  // console.log('dataaaaa', data);
  return (
    <>
      <Link className={className ? className : styles.cardLink} onClick={handleCardClick} to='/pokeinfo'>
        <Card className={styles.card}>
          <CardMedia
            className={styles.img}
            component="img"
            alt={data?.name}
            height="300"
            image={data?.sprites.other['official-artwork'].front_default}
          />
          <CardContent>
            <Typography className={styles.id} gutterBottom variant="h5" component="div">
              #{data?.id}
            </Typography>
            <Typography className={styles.name} variant="body2" color="text.secondary">
              {data?.name}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </>
  );
}