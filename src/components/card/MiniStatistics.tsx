// Chakra imports
import { Flex, Stat, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from '@/components/card/Card';

export default function Default(props: {
	startContent?: JSX.Element;
	endContent?: JSX.Element;
	name: string;
	growth?: string | number;
	value: string | number;
}) {
	const { startContent, endContent, name, value } = props;
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'secondaryGray.600';

	return (
		<Card py='15px'>
			<Flex
				my='auto'
				h='100%'
				align={{ base: 'center', xl: 'center' }}
				justify={{ base: 'center', xl: 'center' }}>
				{startContent}

				<Stat my='auto' ms={startContent ? '18px' : '0px'}>
					<StatLabel
						lineHeight='100%'
						color={textColorSecondary}
						fontSize={{
							base: 'sm'
						}}>
						{name}
					</StatLabel>
					<StatNumber
						color={textColor}
						fontSize={{
							base: '2xl'
						}}>
						{value}
					</StatNumber>
				</Stat>
				<Flex ms='auto' w='max-content'>
					{endContent}
				</Flex>
			</Flex>
		</Card>
	);
}
