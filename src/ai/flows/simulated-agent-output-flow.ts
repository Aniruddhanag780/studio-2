'use server';
/**
 * @fileOverview A Genkit flow for generating simulated command-line output, log entries, or status messages for AI agent cards.
 *
 * - generateSimulatedAgentOutput - A function that generates simulated output based on agent name and output type.
 * - SimulatedAgentOutputInput - The input type for the generateSimulatedAgentOutput function.
 * - SimulatedAgentOutputOutput - The return type for the generateSimulatedAgentOutput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulatedAgentOutputInputSchema = z.object({
  agentName: z.string().describe('The name of the AI agent for which to generate output.'),
  outputType: z
    .enum(['command_line', 'log_entry', 'status_message'])
    .describe('The type of simulated output to generate (command_line, log_entry, or status_message).'),
});
export type SimulatedAgentOutputInput = z.infer<typeof SimulatedAgentOutputInputSchema>;

const SimulatedAgentOutputOutputSchema = z.object({
  output: z.string().describe('The generated simulated output.'),
});
export type SimulatedAgentOutputOutput = z.infer<typeof SimulatedAgentOutputOutputSchema>;

export async function generateSimulatedAgentOutput(
  input: SimulatedAgentOutputInput
): Promise<SimulatedAgentOutputOutput> {
  return simulatedAgentOutputFlow(input);
}

const simulatedAgentOutputPrompt = ai.definePrompt({
  name: 'simulatedAgentOutputPrompt',
  input: {schema: SimulatedAgentOutputInputSchema},
  output: {schema: SimulatedAgentOutputOutputSchema},
  prompt: `You are an AI system status simulator. Generate realistic, context-specific text output for an AI agent.

Agent Name: {{{agentName}}}
Output Type: {{{outputType}}}

{{#ifEq outputType 'command_line'}}
Generate a simulated command-line output for the agent '{{{agentName}}}'. This should look like a terminal or console output, showing actions, success/failure messages, or data processing. Keep it concise, around 3-5 lines.
Example:

~$ {{{agentName}}} --start-processing
[2024-07-20 14:35:01] INFO: Initializing data pipeline...
[2024-07-20 14:35:05] SUCCESS: Processing complete. 128 records processed.

{{else ifEq outputType 'log_entry'}}
Generate a simulated log entry for the agent '{{{agentName}}}'. Include a timestamp, log level (INFO, WARN, ERROR, DEBUG), and a descriptive message about an event, process, or state change. Keep it to a single, realistic log line.
Example:

[2024-07-20 14:35:10] INFO: Agent '{{{agentName}}}' successfully updated configuration from remote source.

{{else ifEq outputType 'status_message'}}
Generate a concise, dynamic status message for the agent '{{{agentName}}}'. This should reflect its current operational state or a recent activity, like 'Processing data', 'Idle', 'Awaiting input', 'Error detected', etc.
Example:

Agent '{{{agentName}}}': Operational - Monitoring system health.

{{/ifEq}}

Generated output:`,
});

const simulatedAgentOutputFlow = ai.defineFlow(
  {
    name: 'simulatedAgentOutputFlow',
    inputSchema: SimulatedAgentOutputInputSchema,
    outputSchema: SimulatedAgentOutputOutputSchema,
  },
  async input => {
    const {output} = await simulatedAgentOutputPrompt(input);
    return output!;
  }
);
