import { useRef } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { useHover } from 'usehooks-ts';
import { TagProps } from './tag.props';

export default function Tag(props: TagProps) {
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  return <article ref={hoverRef} className='flex items-center'>
    <div style={{ backgroundColor: props.color }} className="mx-1 rounded-lg px-2">#{props.name}</div>
    {isHover && <div onClick={() => { props.removeTag(props.name) }}><ImCancelCircle /></div>}
  </article>

}