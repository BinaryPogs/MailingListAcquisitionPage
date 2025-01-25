import { supabase } from '@/lib/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ApiResponse = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const { email } = emailSchema.parse(req.body);

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email, created_at: new Date().toISOString() }]);

    if (error) {
      console.error('Supabase error:', error);
      if (error.code === '23505') {
        // Unique violation
        return res.status(409).json({
          success: false,
          message: 'This email is already on the waitlist',
        });
      }
      throw error;
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully joined waitlist',
    });
  } catch (error) {
    console.error('Waitlist error:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
