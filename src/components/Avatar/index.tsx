
import './style.scss';

const Avatar = ({ name }: { name: string }): JSX.Element => {

  const getFirstLetter = (avatarName: string): string => {
    if (!avatarName.length) throw Error("Not a valid name");

    return avatarName[0].toUpperCase();
  }

  return (
    <div className="avatar">
      <span>{getFirstLetter(name)}</span>
    </div>
  );
}


export default Avatar;
